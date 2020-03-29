import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  selectSubject: Subject<boolean> = new Subject();
  selectedWhiteCards: string[] = [];
  selectedBlackCards: string[] = [];

  constructor() { }

  selectWhiteCard(cardId: string) {
    this.selectedWhiteCards = [cardId];
    console.log(this.selectedWhiteCards);
    this.selectSubject.next();
  }

  multiSelectWhiteCard(id: string): boolean {
    // check if card selected
    if (this.selectedWhiteCards.includes(id)) {
      // unselect card
      this.selectedWhiteCards.splice(this.selectedWhiteCards.indexOf(id), 1);
      console.log(this.selectedWhiteCards);
      return false;
    } else {
      // select card
      this.selectedWhiteCards.push(id);
      console.log(this.selectedWhiteCards);
      return true;
    }
  }

  multiSelectBlackCard(id: string): boolean {
    // check if card selected
    if (this.selectedBlackCards.includes(id)) {
      // unselect card
      this.selectedBlackCards.splice(this.selectedBlackCards.indexOf(id), 1);
      return false;
    } else {
      // select card
      this.selectedBlackCards.push(id);
      return true;
    }
  }

  selectSub(): Subject<boolean> {
    return this.selectSubject;
  }

  getSelectedWhiteCardsId(): string[] {
    return this.selectedWhiteCards;
  }

  getSelectedBlackCardsId(): string[] {
    return this.selectedBlackCards;
  }

  clearCards() {
    this.selectedWhiteCards = [];
    this.selectedBlackCards = [];
  }
}
