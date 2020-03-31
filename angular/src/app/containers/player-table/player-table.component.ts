import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { IGameInfo } from '../../interfaces/igame-info';
import { SocketIoService } from '../../services/socket-io.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit, OnDestroy {

  users: IGameInfo;
  ownUsername = '';

  userSub: Subscription;
  usernameSub: Subscription;
  gameInfoSocketSub: Subscription;

  constructor(private apiService: ApiService, private authService: AuthService, private socketService: SocketIoService) { }

  ngOnInit(): void {
    this.gameInfoSocketSub = this.socketService.gameInfo.subscribe((data: IGameInfo) => {
      this.users = data;
    });
    this.userSub = this.apiService.getIngameInfo().subscribe((data: IGameInfo) => {
      this.users = data;
    });
    this.usernameSub = this.authService.user.subscribe(user => {this.ownUsername = user.username; });
    this.usernameSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
