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
  username = new BehaviorSubject<string>('');
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
    const userData: User = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.username,
      userData.email,
      userData.lastLogin,
      userData.token,
      userData.tokenExpirationDate
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.updateLogin();
      this.autoLogout(loadedUser.tokenExpirationDate);
    }

    const loadedUsername = localStorage.getItem('username');
    if (loadedUsername) {
      this.username.next(loadedUsername);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
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
