import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../../../services/socket-io.service';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../services/api.service';
import { GameStatus } from '../../../../models/game-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  ownUsername: string = '';
  usernameSub: Subscription;
  gameStatusSub: Subscription;

  constructor(private socketService: SocketIoService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.gameStatusSub = this.socketService.gameStatus.subscribe((status: GameStatus) => {
      if (status === GameStatus.Submit || status === GameStatus.Reveil) {
        this.router.navigate(['/game/ingame']);
      }
    });
    this.apiService.getGameStatus().subscribe((status: GameStatus) => {
      if (status === GameStatus.Submit || status === GameStatus.Reveil) {
        this.router.navigate(['/game/ingame']);
      }
    });
  }

  onJoinGame(): void {
    this.apiService.joinGame().subscribe((data) => {
      if (data) {
        console.log(data);
      }
    });
  }
}
