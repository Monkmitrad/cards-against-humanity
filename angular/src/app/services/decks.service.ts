import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private apiService: ApiService) { }

  saveWhiteDeck(deckName: string, cardIds: string[]) {
    if (deckName && cardIds) {
      this.apiService.saveWhiteDeck(deckName, cardIds);
    } else {
    }
  }

  saveBlackDeck(deckName: string, cardIds: string[]) {
    if (deckName && cardIds) {
      this.apiService.saveBlackDeck(deckName, cardIds);
    }
  }

  getWhiteDecks() {
    this.apiService.getWhiteDecks().subscribe(data => console.log(data));
  }

  getBlackDecks() {
    this.apiService.getBlackDecks().subscribe(data => console.log(data));
  }
}
