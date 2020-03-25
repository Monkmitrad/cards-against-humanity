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
    }
  }
}
