import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../interfaces/icard';
import { exhaustMap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';


export interface CardResponse {
    id: {
      content: string;
    };
}

interface UserNameBody {
  userID: string;
  content: {
    lastLogin: Date;
    username: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  whiteUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/white-cards.json';
  blackUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/black-cards.json';
  userUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/users/';
  whiteDeckUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/decks/white/';
  blackDeckUrl: string = 'https://cards-against-humanity-angular.firebaseio.com/decks/black/';

  constructor(private http: HttpClient) { }

  addWhiteCard(card: ICard) {
    this.http.post(this.whiteUrl, {content: card.content});
  }

  addBlackCard(card: ICard) {
    this.http.post(this.blackUrl, {content: card.content});
  }

  getWhiteCards() {
    return this.http.get(this.whiteUrl).pipe(
      exhaustMap(response => this.transformResponse(response)));
  }

  getBlackCards() {
    return this.http.get(this.blackUrl).pipe(
      exhaustMap(response => this.transformResponse(response)));
  }

  transformResponse(response: any): Observable<ICard[]> {
    const cards: ICard[] = [];
    if (response) {
      Object.keys(response).forEach(element => {
        cards.push({id: element, content: response[element].content});
        return cards;
      });
    }
    return of(cards);
  }

  setUsername(userId: string, username: string) {
    const body = {username: username, lastLogin: new Date()};
    this.http.put(this.userUrl + userId + '.json', body);
  }

  getUsername(userId: string): Observable<string> {
    return this.http.get(this.userUrl + userId + '.json').pipe(
      exhaustMap((data: {lastLogin: Date, username: string}) => of(data.username)));
  }

  saveWhiteDeck(deckName: string, cardIds: string[]) {
    this.http.put(this.whiteDeckUrl + deckName + '.json', JSON.stringify(cardIds)).subscribe(data => console.log(data));
  }
}
