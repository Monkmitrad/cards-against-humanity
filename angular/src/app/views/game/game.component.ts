import { Component, OnInit } from '@angular/core';

import { SelectService } from '../../services/select.service';
import { AuthService } from '../../services/auth.service';
import { SocketIoService } from '../../services/socket-io.service';
import { ApiService } from '../../services/api.service';
import { IGameInfo } from '../../interfaces/igame-info';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  gameInfo: IGameInfo;

  constructor(
    private selectService: SelectService,
    private authService: AuthService,
    private socketService: SocketIoService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.selectService.clearCards();
    this.apiService.getIngameInfo().subscribe((data: IGameInfo) => {
      console.log(data);
      this.gameInfo = data;
    });
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
