import { Component, OnInit, OnDestroy } from '@angular/core';

import { SelectService } from '../../services/select.service';
import { AuthService } from '../../services/auth.service';
import { SocketIoService } from '../../services/socket-io.service';
import { ApiService } from '../../services/api.service';
import { IGameInfo } from '../../interfaces/igame-info';
import { ICard } from '../../interfaces/icard';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { GameStatus } from '../../models/game-status.enum';

@Component({
  templateUrl: 'game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {

  gameInfo: IGameInfo;
  gameStatus: GameStatus;
  whiteCards: ICard[];
  playedCards: {
    card: ICard;
    username: string;
  }[] = [];
  ownUsername = '';
  disabled = false;
  showPlayedCards = false;
  canSelect = true;

  gameStatusSub: Subscription;
  apiSub: Subscription;
  socketInfoSub: Subscription;
  socketStatusSub: Subscription;
  authSub: Subscription;

  constructor(
    private selectService: SelectService,
    private authService: AuthService,
    private socketService: SocketIoService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.selectService.clearCards();
    this.apiSub = this.apiService.getWhiteCards().subscribe((cards: ICard[]) => this.whiteCards = cards);
    this.socketInfoSub = this.socketService.gameInfo.subscribe((data: IGameInfo) => {
      if (data) {
        this.gameInfo = data;
        this.disabled = this.ownUsername === data.currentCzar;
        this.playedCards = [];
        data.players.forEach((player) => {
          if (player.played) {
            this.playedCards.push({card: {_id: player.playedCard, content: player.cardContent}, username: player.username});
          }
        });
      }
    });
    this.apiService.getIngameInfo().subscribe((data: IGameInfo) => {
      this.gameInfo = data;
      this.disabled = this.ownUsername === data.currentCzar;
      this.playedCards = [];
      data.players.forEach((player) => {
        if (player.played) {
          this.playedCards.push({card: {_id: player.playedCard, content: player.cardContent}, username: player.username});
        }
      });
    });
    this.gameStatusSub = this.socketService.gameStatus.subscribe((status: GameStatus) => {
      this.gameStatus = status;
      switch (status) {
        case GameStatus.Reveil:
          this.showPlayedCards = true;
          this.canSelect = this.ownUsername === this.gameInfo.currentCzar;
          break;
        case GameStatus.Submit:
          this.showPlayedCards = false;
          this.canSelect = this.ownUsername === this.gameInfo.currentCzar;
        default:
          break;
      }
    });
    this.apiService.getGameStatus().subscribe((status: GameStatus) => {
      this.gameStatus = status;
      if (status === GameStatus.Reveil) {
        this.showPlayedCards = true;
        this.canSelect = this.ownUsername === this.gameInfo.currentCzar;
      }
    });
    this.authService.user.subscribe((user: User) => this.ownUsername = user.username);
  }

  ngOnDestroy(): void {
    try {
      this.gameStatusSub.unsubscribe();
      this.socketInfoSub.unsubscribe();
      this.socketStatusSub.unsubscribe();
      this.apiSub.unsubscribe();
      this.authSub.unsubscribe();
    } catch (error) {
    }
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

  winnerCard() {
    const cardId: string = this.selectService.getSelectedWhiteCardsId()[0];
    this.apiService.winnerCard(cardId).subscribe((response) => {
      if (response) {
        console.log(response);
      }
    });
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
