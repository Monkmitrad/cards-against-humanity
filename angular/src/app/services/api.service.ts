import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../interfaces/icard';
import { exhaustMap, catchError, tap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { IDeck } from '../interfaces/ideck';

export interface CardResponse {
    id: {
      content: string;
    };
}

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

  constructor(private http: HttpClient) { }

  // Methods for white-cards and black-cards

  addWhiteCard(card: ICard) {
    this.http.post(this.apiWhiteUrl, {content: card.content});
  }

  addBlackCard(card: ICard) {
    this.http.post(this.apiBlackUrl, {content: card.content});
  }

  getWhiteCards() {
    return this.http.get(this.apiWhiteUrl).pipe(
      exhaustMap(response => this.transformCardResponse(response)));
  }

  getBlackCards() {
    return this.http.get(this.apiBlackUrl).pipe(
      exhaustMap(response => this.transformCardResponse(response)));
  }

  transformCardResponse(response: any): Observable<ICard[]> {
    const cards: ICard[] = [];
    if (response) {
      Object.keys(response).forEach(element => {
        cards.push({id: element, content: response[element].content});
        return cards;
      });
    }
    return of(cards);
  }

  // Methods for DecksService

  saveWhiteDeck(deckName: string, cardIds: string[]) {
    this.http.put(this.whiteDeckUrl + '/' + deckName + '.json', JSON.stringify(cardIds));
  }

  saveBlackDeck(deckName: string, cardIds: string[]) {
    this.http.put(this.blackDeckUrl + '/' + deckName + '.json', JSON.stringify(cardIds));
  }

  getWhiteDecks() {
    return this.http.get(this.whiteDeckUrl + '.json').pipe(
      exhaustMap((data) => this.transformDeckResponse(data))
    );
  }

  getBlackDecks() {
    return this.http.get(this.blackDeckUrl + '.json').pipe(
      exhaustMap(data => this.transformDeckResponse(data)));
  }

  transformDeckResponse(response: any): Observable<IDeck[]> {
    const decks: IDeck[] = [];
    if (response) {
      Object.keys(response).forEach(element => {
        decks.push({deckName: element, cards: response[element]});
        return decks;
      });
    }
    return of(decks);
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
      catchError(this.handleError), tap((responseData) => responseData, (error) => console.log(error))
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
}
