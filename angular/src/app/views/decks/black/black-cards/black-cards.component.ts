import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ICard } from '../../../../interfaces/icard';
import { ApiService } from '../../../../services/api.service';
import { DecksService } from '../../../../services/decks.service';
import { SelectService } from '../../../../services/select.service';

@Component({
  selector: 'app-black-cards',
  templateUrl: './black-cards.component.html',
  styleUrls: ['./black-cards.component.css']
})
export class BlackCardsComponent implements OnInit {

  blackCards: ICard[];

  constructor(private apiService: ApiService, private decksService: DecksService, private selectService: SelectService) { }

  ngOnInit(): void {
    this.getCards();
    // this.selectService.clearCards();
  }

  addCard() {
    this.apiService.addBlackCard({content: 'Test'});
  }

  getCards() {
    this.apiService.getBlackCards().subscribe((cards: ICard[]) => this.blackCards = cards);
  }

  savePreset() {
    this.decksService.saveBlackDeck('Test Deck', this.selectService.getSelectedBlackCardsId());
  }

  getDecks() {
    
  }
}
