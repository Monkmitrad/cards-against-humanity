import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  selectSubject: Subject<boolean> = new Subject();
  selectedCardId: string[] = [];

  constructor() { }

  selectWhiteCard(cardId: string) {
    this.selectedCardId = [cardId];
    console.log(this.selectedCardId);
    this.selectSubject.next();
  }

  multiSelectWhiteCard(id: string) {
    // check if card already selected
    if (this.selectedCardId.includes(id)) {
      // unselect card
      this.selectedCardId.splice(this.selectedCardId.indexOf(id), 1);
      console.log(this.selectedCardId);
      return false;
    } else {
      // select card
      this.selectedCardId.push(id);
      console.log(this.selectedCardId);
      return true;
    }
  }

  selectSub(): Subject<boolean> {
    return this.selectSubject;
  }

  getSelectedCardId(): string[] {
    return this.selectedCardId;
  }
}
