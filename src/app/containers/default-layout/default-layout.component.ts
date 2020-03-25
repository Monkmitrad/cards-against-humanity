import {Component, OnInit, OnDestroy } from '@angular/core';
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
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user; // check if user is not existent
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  onLogout() {
    this.authService.logout();
  }
}
