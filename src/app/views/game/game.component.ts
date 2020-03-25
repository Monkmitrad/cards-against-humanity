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
    const cardId: string = this.selectService.getSelectedCardId();
    if (cardId || cardId === '') {
      alert('Your selected card: ' + cardId);
    } else {
      alert('Please select a card');
    }
  }
}
