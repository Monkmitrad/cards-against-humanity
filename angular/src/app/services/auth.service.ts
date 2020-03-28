import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ApiService, AuthResponseData } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { }

  signup(email: string, password: string, username: string) {
    return this.apiService.signup(email, password, username).pipe(
      tap((data: AuthResponseData) => {
        this.handleAuthentication(
          data.user._id,
          data.user.username,
          data.user.email,
          data.user.lastLogin,
          data.token.token,
          data.token.expiresAt
        );
      }, error => error)
    );
  }

  signin(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((data: AuthResponseData) => {
        this.handleAuthentication(
          data.user._id,
          data.user.username,
          data.user.email,
          data.user.lastLogin,
          data.token.token,
          data.token.expiresAt
        );
      }, error => error)
    );
  }

  logout() {
    this.apiService.logout();
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    localStorage.removeItem('username');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const loadedUser: User = JSON.parse(localStorage.getItem('userData'));

    if (!loadedUser) {
      return;
    }

    if (!loadedUser.tokenExpirationDate || new Date().getSeconds() > loadedUser.tokenExpirationDate) {
      return;
    } else {
      this.user.next(loadedUser);
      this.updateLogin();
      this.autoLogout(loadedUser.tokenExpirationDate);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration * 1000);
  }

  private handleAuthentication(userId: string, username: string, email: string, lastLogin: Date, token: string, expiresAt: number) {
    const user = new User(userId, username, email, lastLogin, token, expiresAt);
    this.user.next(user);
    this.autoLogout(expiresAt);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private updateLogin() {
    this.apiService.updateLogin();
  }
}
