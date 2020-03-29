import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../../../services/socket-io.service';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  ownUsername: string = '';
  usernameSub: Subscription;

  constructor(private socketService: SocketIoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.usernameSub = this.authService.user.subscribe(user => {this.ownUsername = user.username; });
    this.usernameSub.unsubscribe();
  }

  onJoinGame(): void {
    if (this.ownUsername) {
      this.socketService.joinGame(this.ownUsername);
    }
  }
}
