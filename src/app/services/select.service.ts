import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  selectSubject: Subject<boolean> = new Subject();
  selectedCardId: number;

  constructor() { }

  selectWhiteCard(cardId: number) {
    this.selectedCardId = cardId;
    console.log(this.selectedCardId);
    this.selectSubject.next();
  }

  selectSub(): Subject<boolean> {
    return this.selectSubject;
  }

  getSelectedCardId(): number {
    return this.selectedCardId;
  }
}
