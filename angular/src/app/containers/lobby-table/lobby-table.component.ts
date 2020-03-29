import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { SocketIoService } from '../../services/socket-io.service';

@Component({
  selector: 'app-lobby-table',
  templateUrl: './lobby-table.component.html',
  styleUrls: ['./lobby-table.component.css']
})
export class LobbyTableComponent implements OnInit, OnDestroy {

  users: string[] = [];
  ownUsername = '';

  userSub: Subscription;
  usernameSub: Subscription;

  constructor(private authService: AuthService, private socketService: SocketIoService) { }

  ngOnInit(): void {
    this.users = this.socketService.getLoggedInUsers();
    this.usernameSub = this.authService.user.subscribe(user => {this.ownUsername = user.username; });
    this.usernameSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
