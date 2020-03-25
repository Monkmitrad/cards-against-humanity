import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../interfaces/icard';
import { exhaustMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


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

  constructor(private http: HttpClient) { }

  addWhiteCard(card: ICard) {
    this.http.post(this.whiteUrl, {content: card.content}).subscribe(data => console.log(data));
  }

  addBlackCard(card: ICard) {
    this.http.post(this.blackUrl, {content: card.content}).subscribe(data => console.log(data));
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
}
