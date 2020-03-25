import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../services/select.service';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  constructor(private selectService: SelectService) { }

  ngOnInit() {
    this.selectService.clearCards();
  }

  submitCard() {
    const cardId: string[] = this.selectService.getSelectedWhiteCardsId();
    if (cardId.length) {
      alert('Your selected card: ' + cardId);
    } else {
      alert('Please select a card');
    }
  }
}
