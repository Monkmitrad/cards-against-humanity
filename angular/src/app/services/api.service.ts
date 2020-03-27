import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../interfaces/icard';
import { exhaustMap, map } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { IDeck } from '../interfaces/ideck';
import { User } from '../models/user';


export interface CardResponse {
    id: {
      content: string;
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

  constructor(private http: HttpClient) { }

  // Methods for white-cards and black-cards

  addWhiteCard(card: ICard) {
    this.http.post(this.whiteUrl, {content: card.content});
  }

  addBlackCard(card: ICard) {
    this.http.post(this.blackUrl, {content: card.content});
  }

  getWhiteCards() {
    return this.http.get(this.whiteUrl).pipe(
      exhaustMap(response => this.transformCardResponse(response)));
  }

  getBlackCards() {
    return this.http.get(this.blackUrl).pipe(
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

  setUsername(userId: string, username: string): void {
    const body = {username: username, lastLogin: new Date()};
    this.http.put(this.userUrl + '/' + userId + '.json', body);
  }

  getUsername(userId: string): Observable<string> {
    return this.http.get(this.userUrl + '/' + userId + '.json').pipe(
      exhaustMap((data: {lastLogin: Date, username: string}) => of(data.username)));
  }

  updateLogin(date: Date, userId: string) {
    // this.http.patch(this.userUrl + '/' + userId + '.json', { lastLogin: date }).subscribe();
  }

  // Methods for PlayerTable

  getAllUsers() {
    const users: {lastLogin: Date, username: string}[] = [];
    return this.http.get(this.userUrl + '.json').pipe(
      exhaustMap((data: any) => {
        if (data) {
          Object.keys(data).forEach(element => {
            users.push({lastLogin: data[element].lastLogin, username: data[element].username});
            return users;
          });
          return of(users);
        }
      })
    );
  }

  // Test methods

  Test() {
    this.http.get('/api/test').subscribe(data => console.log(data));
  }
}
