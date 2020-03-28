import {Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public sidebarMinimized = false;
  public navItems = navItems;
  public isAuthenticated = false;
  public username = '';
  private userSub: Subscription;
  private usernameSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user; // check if user is not existent
    });
    this.usernameSub = this.authService.user.subscribe((user: User) => {
      this.username = user.username;
    });
    this.usernameSub.unsubscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  onLogout() {
    this.authService.logout();
    this.userSub.unsubscribe();
  }
}
