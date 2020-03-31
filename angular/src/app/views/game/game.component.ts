import { Component, OnInit } from '@angular/core';

import { SelectService } from '../../services/select.service';
import { AuthService } from '../../services/auth.service';
import { SocketIoService } from '../../services/socket-io.service';
import { ApiService } from '../../services/api.service';
import { IGameInfo } from '../../interfaces/igame-info';
import { ICard } from '../../interfaces/icard';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  gameInfo: IGameInfo;
  whiteCards: ICard[];

  constructor(
    private selectService: SelectService,
    private authService: AuthService,
    private socketService: SocketIoService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.selectService.clearCards();
    this.apiService.getWhiteCards().subscribe((cards: ICard[]) => this.whiteCards = cards);
  }

  submitCard() {
    const cardId: string[] = this.selectService.getSelectedWhiteCardsId();
    this.socketService.sendMessage('Hello World');
    this.apiService.submitCard(cardId[0]).subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
    /*if (cardId.length) {
      alert('Your selected card: ' + cardId);
    } else {
      alert('Please select a card');
    }*/
  }
}
