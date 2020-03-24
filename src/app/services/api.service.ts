import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICard } from '../interfaces/icard';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  whiteUrl: 'https://cards-against-humanity-angular.firebaseio.com/white-cards.json';
  blackUrl: 'https://cards-against-humanity-angular.firebaseio.com/black-cards.json';

  constructor(private http: HttpClient) { }

  addWhiteCard(card: ICard) {
    this.http.post('https://cards-against-humanity-angular.firebaseio.com/white-cards.json',
    {content: card.content}).subscribe(data => console.log(data));
  }

  addBlackCard(card: ICard) {
    this.http.put('https://cards-against-humanity-angular.firebaseio.com/black-cards.json',
    {content: card.content}).subscribe(data => console.log(data));
  }

  getWhiteCards() {
    return this.http.get('https://cards-against-humanity-angular.firebaseio.com/white-cards.json');
  }

  getBlackCards() {
    return this.http.get('https://cards-against-humanity-angular.firebaseio.com/black-cards.json');
  }
}