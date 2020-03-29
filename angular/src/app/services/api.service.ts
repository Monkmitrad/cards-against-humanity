import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../interfaces/icard';
import { exhaustMap, catchError, tap, map } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { IDeck } from '../interfaces/ideck';

export interface AuthResponseData {
  user: {
    _id: string;
    username: string;
    email: string;
    lastLogin: Date;
  };
  token: {
    token: string;
    expiresAt: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  whiteUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/white-cards.json';
  blackUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/black-cards.json';
  userUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/users/';
  whiteDeckUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/decks/white';
  blackDeckUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/decks/black';

  apiUrl: string = '/api/';
  apiWhiteUrl: string = this.apiUrl + 'card/white';
  apiBlackUrl: string = this.apiUrl + 'card/black';
  apiUserUrl: string = this.apiUrl + 'user';
  apiOwnUserUrl: string = this.apiUrl + 'user/me';
  apiWhiteDeckUrl: string = this.apiUrl + 'deck/white';
  apiBlackDeckUrl: string = this.apiUrl + 'deck/black';
  apiLoginUrl: string = this.apiUrl + 'login';
  apiLogoutUrl: string = this.apiUrl + 'logout';
  apiGameLoggedInUsersUrl: string = this.apiUrl + 'game/users';

  constructor(private http: HttpClient) { }

  // Methods for white-cards and black-cards

  addWhiteCard(content: string) {
    this.http.post(this.apiWhiteUrl, content).pipe(
      catchError(this.handleError), tap(response => response)
    );
  }

  addBlackCard(content: string) {
    return this.http.post(this.apiBlackUrl, content).pipe(
      catchError(this.handleError), tap(response => response)
    );
  }

  getWhiteCards() {
    return this.http.get(this.apiWhiteUrl).pipe(
      catchError(this.handleError), tap((data: ICard[]) => data)
    );
  }

  getBlackCards() {
    return this.http.get(this.apiBlackUrl).pipe(
      catchError(this.handleError), tap((data: ICard[]) => data)
    );
  }

  // Methods for DecksService

  saveWhiteDeck(deckName: string, cardIds: string[]) {
    this.http.post(this.apiWhiteDeckUrl, {deckName, cardIds}).subscribe(response => console.log(response));
  }

  saveBlackDeck(deckName: string, cardIds: string[]) {
    this.http.post(this.apiBlackDeckUrl, {deckName, cardIds});
  }

  getWhiteDecks() {
    return this.http.get(this.apiWhiteDeckUrl).pipe(
      catchError(this.handleError), map((data: IDeck[]) => data)
    );
  }

  getBlackDecks() {
    return this.http.get(this.apiBlackDeckUrl).pipe(
      catchError(this.handleError), tap((data: IDeck[]) => data)
    );
  }

  // Methods for AuthService

  signup(email: string, password: string, username: string) {
    return this.http.post<AuthResponseData>(this.apiUserUrl, {username, email, password}).pipe(
      catchError(this.handleError), tap((responseData: AuthResponseData) => responseData)
    );
  }

  login(email: string, password: string) {
    return this.http.post(this.apiLoginUrl, {email, password}).pipe(
      catchError(this.handleError), tap((responseData: AuthResponseData) => responseData)
    );
  }

  logout() {
    return this.http.post(this.apiLogoutUrl, {}).pipe(
      catchError(this.handleError)
    );
  }

  updateLogin() {
    return this.http.patch(this.apiOwnUserUrl, {lastLogin: new Date()}).pipe(
      catchError(this.handleError)
    );
  }

  // Methods for PlayerTable

  getAllUsers() {
    return this.http.get(this.apiUserUrl).pipe(
      catchError(this.handleError), tap((responseData) => responseData)
    );
  }

  private handleError(errorResponse: {errorMessage: string}) {
    console.log(errorResponse);
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.errorMessage) {
      return throwError(errorMessage);
    }
    switch (errorResponse.errorMessage) {
      case 'Login failed!':
        errorMessage = 'Login failed!';
        break;
    }

    return throwError(errorMessage);
  }

  // Methods for game logic

  getLoggedInUsers() {
    return this.http.get(this.apiGameLoggedInUsersUrl).pipe(
      catchError(this.handleError), tap((data: string[]) => data)
    );
  }
}
