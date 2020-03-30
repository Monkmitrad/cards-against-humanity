import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { SocketIoService } from '../../services/socket-io.service';
import { ApiService } from '../../services/api.service';

export interface LoggedInUsers {
  username: string;
  ready: boolean;
}

@Component({
  selector: 'app-lobby-table',
  templateUrl: './lobby-table.component.html',
  styleUrls: ['./lobby-table.component.css']
})
export class LobbyTableComponent implements OnInit, OnDestroy {

  users: LoggedInUsers[] = [];
  ownUsername = '';

  userSub: Subscription;
  usernameSub: Subscription;
  userUpdateSub: Subscription;

  constructor(private authService: AuthService, private socketService: SocketIoService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.usernameSub = this.authService.user.subscribe(user => {this.ownUsername = user.username; });
    this.usernameSub.unsubscribe();
    this.userSub = this.apiService.getLoggedInUsers().subscribe((users: LoggedInUsers[]) => this.users = users);
    this.userUpdateSub = this.socketService.joinedUsers.subscribe((users: LoggedInUsers[]) => this.users = users);
  }

  ngOnDestroy(): void {
    this.userUpdateSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  onReady(evt: any) {
    this.apiService.ready(evt.currentTarget.checked).subscribe();
  }
}
