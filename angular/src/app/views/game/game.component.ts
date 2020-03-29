import { Component, OnInit } from '@angular/core';
import { SelectService } from '../../services/select.service';
import { AuthService } from '../../services/auth.service';
import { SocketIoService } from '../../services/socket-io.service';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  constructor(private selectService: SelectService, private authService: AuthService, private socketService: SocketIoService) { }

  ngOnInit() {
    this.selectService.clearCards();
  }

  submitCard() {
    const cardId: string[] = this.selectService.getSelectedWhiteCardsId();
    this.socketService.sendMessage('Hello World');
    if (cardId.length) {
      alert('Your selected card: ' + cardId);
    } else {
      alert('Please select a card');
    }
  }
}
