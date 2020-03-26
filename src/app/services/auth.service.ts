import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import * as config from '../../environments/config.json';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  username = new BehaviorSubject<string>('');
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { }

  signup(email: string, password: string, username: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + config.google_api_key;
    console.log(url);
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        this.setUsername(username);
        this.username.next(username);
        localStorage.setItem('username', username);
      }));
  }

  signin(email: string, password2: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + config.google_api_key;
    return this.http.post<AuthResponseData>(url,
      {
        email: email,
        password: password2,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        this.apiService.getUsername(responseData.localId).subscribe(data => {
          this.username.next(data);
          localStorage.setItem('username', data);
        });
      }));
  }

  logout() {
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
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

    const loadedUsername = localStorage.getItem('username');
    if (loadedUsername) {
      this.username.next(loadedUsername);
    }

    this.updateLogin();
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email was not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is invalid!';
        break;
    }

    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    this.updateLogin();
  }

  private setUsername(username: string) {
    const user = this.user.value;
    this.apiService.setUsername(user.id, username);
  }

  updateLogin() {
    this.apiService.updateLogin(new Date(), this.user.value.id);
  }
}
