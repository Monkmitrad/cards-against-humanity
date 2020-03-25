import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ICard } from '../../../../interfaces/icard';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-black-cards',
  templateUrl: './black-cards.component.html',
  styleUrls: ['./black-cards.component.css']
})
export class BlackCardsComponent implements OnInit {

  blackCards: ICard[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCards();
  }

  addCard() {
    this.apiService.addBlackCard({content: 'Test'});
  }

  getCards() {
    this.apiService.getBlackCards().subscribe((cards: ICard[]) => this.blackCards = cards);
  }
}
