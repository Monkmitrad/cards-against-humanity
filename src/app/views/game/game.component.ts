import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../services/select.service';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  constructor(private selectService: SelectService) { }

  ngOnInit() {

  }

  submitCard() {
    const cardId: number = this.selectService.getSelectedCardId();
    if (cardId || cardId === 0) {
      alert('Your selected card: ' + cardId);
    } else {
      alert('Please select a card');
    }
  }
}
