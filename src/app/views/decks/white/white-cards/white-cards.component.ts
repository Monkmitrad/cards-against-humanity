import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ICard } from '../../../../interfaces/icard';

@Component({
  selector: 'app-white-cards',
  templateUrl: './white-cards.component.html',
  styleUrls: ['./white-cards.component.css']
})
export class WhiteCardsComponent implements OnInit {

  whiteCards: ICard[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCards();
  }

  addCard() {
    this.apiService.addWhiteCard({content: 'Test'});
  }

  getCards() {
    this.apiService.getWhiteCards().subscribe((cards: ICard[]) => this.whiteCards = cards);
  }
}
