import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICard } from '../interfaces/icard';
import { tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IDeck } from '../interfaces/ideck';
import { LoggedInUsers } from '../containers/lobby-table/lobby-table.component';
import { IGameInfo } from '../interfaces/igame-info';

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
  apiGameJoinUrl: string = this.apiUrl + 'game/join';

  constructor(private http: HttpClient) { }

  // Methods for white-cards and black-cards

  addWhiteCard(content: string) {
    this.http.post(this.apiWhiteUrl, {content}).pipe(
      tap((response) => response,  (error) => this.handleError(error))
    );
  }

  addBlackCard(content: string) {
    return this.http.post(this.apiBlackUrl, {content}).pipe(
      tap((response) => response,  (error) => this.handleError(error))
    );
  }

  getWhiteCards() {
    return this.http.get(this.apiWhiteUrl).pipe(
      tap((data: ICard[]) => data, (error) => this.handleError(error))
    );
  }

  getBlackCards() {
    return this.http.get(this.apiBlackUrl).pipe(
      tap((data: ICard[]) => data, (error) => this.handleError(error))
    );
  }

  // Methods for DecksService

  saveWhiteDeck(deckName: string, cardIds: string[]) {
    this.http.post(this.apiWhiteDeckUrl, {deckName, cardIds}).pipe(
      tap((response) => response,  (error) => this.handleError(error))
    );
  }

  saveBlackDeck(deckName: string, cardIds: string[]) {
    this.http.post(this.apiBlackDeckUrl, {deckName, cardIds}).pipe(
      tap((response) => response,  (error) => this.handleError(error))
    );
  }

  getWhiteDecks() {
    return this.http.get(this.apiWhiteDeckUrl).pipe(
      tap((data: IDeck[]) => data, (error) => this.handleError(error))
    );
  }

  getBlackDecks() {
    return this.http.get(this.apiBlackDeckUrl).pipe(
      tap((data: IDeck[]) => data, (error) => this.handleError(error))
    );
  }

  // Methods for AuthService

  signup(email: string, password: string, username: string) {
    return this.http.post<AuthResponseData>(this.apiUserUrl, {username, email, password}).pipe(
      tap((responseData: AuthResponseData) => responseData, (error) => this.handleError(error))
    );
  }

  login(email: string, password: string) {
    return this.http.post(this.apiLoginUrl, {email, password}).pipe(
      tap((responseData: AuthResponseData) => responseData, (error) => this.handleError(error))
    );
  }

  logout() {
    return this.http.post(this.apiLogoutUrl, {}).pipe(
      tap((data) => data,  (error) => this.handleError(error))
    );
  }

  updateLogin() {
    return this.http.patch(this.apiOwnUserUrl, {lastLogin: new Date()}).pipe(
      tap((data) => data,  (error) => this.handleError(error))
    );
  }

  // Methods for PlayerTable

  getAllUsers() {
    return this.http.get(this.apiUserUrl).pipe(
      tap((responseData) => responseData, (error) => this.handleError(error))
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorResponse.error.errorMessage) {
      throw(errorMessage);
    }
    switch (errorResponse.error.errorMessage) {
      case 'Login failed!':
        errorMessage = 'Login failed!';
        break;
      case 'Already joined the game!':
        errorMessage =  'User already joined the game!';
        break;
      case 'Game already started!':
        errorMessage = errorResponse.statusText + ': Game has already started!';
        break;
      case 'This API endpoint does not exist!':
        errorMessage = errorResponse.statusText + ': Wrong API endpoint!';
        break;
      default:
        errorMessage = errorResponse.error.errorMessage;
        break;
    }

    throw(errorMessage);
  }

  // Methods for game logic

  getLoggedInUsers() {
    return this.http.get(this.apiGameLoggedInUsersUrl).pipe(
      tap((data: LoggedInUsers[]) => data, (error) => this.handleError(error))
    );
  }

  joinGame() {
    return this.http.post('/api/game/lobby/join', {}).pipe(
      tap((response) => response, (error) => this.handleError(error))
    );
  }

  getGameStatus() {
    return this.http.get('/api/game/status').pipe(
      tap((data) => data, (error) => this.handleError(error))
    );
  }

  ready(status: boolean) {
    return this.http.post('/api/game/lobby/ready', {status}).pipe(
      tap((response) => response, (error) => this.handleError(error))
    );
  }

  getIngameInfo() {
    return this.http.get('/api/game/ingame/info').pipe(
      tap((data: IGameInfo) => data, (error) => this.handleError(error))
    );
  }
}
