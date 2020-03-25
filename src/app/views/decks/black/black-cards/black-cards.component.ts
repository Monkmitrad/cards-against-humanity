import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ICard } from '../../../../interfaces/icard';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-black-cards',
  templateUrl: './black-cards.component.html',
  styleUrls: ['./black-cards.component.css']
})
export class BlackCardsComponent implements OnInit, AfterViewInit {

  blackCards: ICard[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getCards();
  }

  addCard() {
    this.apiService.addBlackCard({id: '1', content: 'Test'});
    this.getCards();
  }

  getCards() {
    this.apiService.getBlackCards().subscribe((cards: ICard[]) => this.blackCards = cards);
  }
}
