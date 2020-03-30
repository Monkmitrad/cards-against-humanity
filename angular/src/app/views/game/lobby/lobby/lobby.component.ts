import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../../../services/socket-io.service';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  ownUsername: string = '';
  usernameSub: Subscription;

  constructor(private socketService: SocketIoService, private authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.usernameSub = this.authService.user.subscribe(user => {this.ownUsername = user.username; });
    this.usernameSub.unsubscribe();
  }

  onJoinGame(): void {
    this.apiService.joinGame().subscribe((data) => {
      if (data) {
        console.log(data);
      }
    });
  }
}
