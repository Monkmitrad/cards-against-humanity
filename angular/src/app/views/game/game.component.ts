import { Component, OnInit } from '@angular/core';

import { SelectService } from '../../services/select.service';
import { AuthService } from '../../services/auth.service';
import { SocketIoService } from '../../services/socket-io.service';
import { ApiService } from '../../services/api.service';
import { IGameInfo } from '../../interfaces/igame-info';
import { ICard } from '../../interfaces/icard';
import { User } from '../../models/user';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit {

  gameInfo: IGameInfo;
  whiteCards: ICard[];
  ownUsername = '';
  disabled = false;

  constructor(
    private selectService: SelectService,
    private authService: AuthService,
    private socketService: SocketIoService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.selectService.clearCards();
    this.apiService.getWhiteCards().subscribe((cards: ICard[]) => this.whiteCards = cards);
    this.socketService.gameInfo.subscribe((data: IGameInfo) => {
      if (data) {
        this.gameInfo = data;
        this.disabled = this.ownUsername === data.currentCzar;
      }
    });
    this.apiService.getIngameInfo().subscribe((data: IGameInfo) => {
      this.gameInfo = data;
      this.disabled = this.ownUsername === data.currentCzar;
    });
    this.authService.user.subscribe((user: User) => this.ownUsername = user.username);
  }

  submitCard() {
    const cardId: string[] = this.selectService.getSelectedWhiteCardsId();
    if (cardId.length) {
      if (!(this.ownUsername === this.gameInfo.currentCzar)) {
        if (!this.checkIfPlayed(this.ownUsername)) {
          this.apiService.submitCard(cardId[0]).subscribe((response) => {
            if (response) {
              console.log(response);
            }
            this.disabled = true;
          });
        } else {
          alert('You already played a card');
          this.selectService.clearSelect();
        }
      } else {
        alert('You are the card czar!');
        this.selectService.clearSelect();
      }
    } else {
      alert('Please select a card');
    }
  }

  checkIfPlayed(username: string): boolean {
    const selectedUser = this.gameInfo.players.find((user) => user.username === username);
    if (selectedUser.played) {
      return true;
    } else {
      return false;
    }
  }
}
