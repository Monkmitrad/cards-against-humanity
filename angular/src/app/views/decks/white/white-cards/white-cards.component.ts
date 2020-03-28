import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ICard } from '../../../../interfaces/icard';
import { DecksService } from '../../../../services/decks.service';
import { SelectService } from '../../../../services/select.service';

@Component({
  selector: 'app-white-cards',
  templateUrl: './white-cards.component.html',
  styleUrls: ['./white-cards.component.css']
})
export class WhiteCardsComponent implements OnInit {

  whiteCards: ICard[];

  constructor(private apiService: ApiService, private decksService: DecksService, private selectService: SelectService) { }

  ngOnInit(): void {
    this.selectService.clearCards();
    this.getCards();
  }

  addCard() {
    this.apiService.addWhiteCard('Test');
  }

  getCards() {
    this.apiService.getWhiteCards().subscribe((cards: ICard[]) => this.whiteCards = cards);
  }

  savePreset() {
    this.decksService.saveWhiteDeck('Test Deck', this.selectService.getSelectedWhiteCardsId());
  }

  getDecks() {
    this.decksService.getWhiteDecks();
  }
}
