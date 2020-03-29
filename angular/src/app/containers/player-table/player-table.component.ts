import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit, OnDestroy {

  users: {lastLogin: Date, username: string}[] = [];
  ownUsername = '';

  userSub: Subscription;
  usernameSub: Subscription;

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.apiService.getAllUsers().subscribe((data: {username: string, lastLogin: Date}[]) => this.users = data);
    this.usernameSub = this.authService.user.subscribe(user => {this.ownUsername = user.username; });
    this.usernameSub.unsubscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
