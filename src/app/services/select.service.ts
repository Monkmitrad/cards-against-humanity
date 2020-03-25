import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  selectSubject: Subject<boolean> = new Subject();
  selectedCardId: string;

  constructor() { }

  selectWhiteCard(cardId: string) {
    this.selectedCardId = cardId;
    console.log(this.selectedCardId);
    this.selectSubject.next();
  }

  selectSub(): Subject<boolean> {
    return this.selectSubject;
  }

  getSelectedCardId(): string {
    return this.selectedCardId;
  }
}
