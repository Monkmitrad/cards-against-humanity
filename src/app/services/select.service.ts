import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  selectSubject: Subject<boolean> = new Subject();

  constructor() { }

  selectWhiteCard() {
    this.selectSubject.next();
  }

  selectSub(): Subject<boolean> {
    return this.selectSubject;
  }
}
