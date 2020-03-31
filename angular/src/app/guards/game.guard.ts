import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { GameStatus } from '../models/game-status.enum';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.apiService.getGameStatus().pipe(map((status: GameStatus) => {
        switch (status) {
          case GameStatus.NotStarted:
            return this.router.createUrlTree(['/game/lobby']);
          case GameStatus.Submit: case GameStatus.Reveil:
            return true;
          default:
            return this.router.createUrlTree(['/game/lobby']);
        }
      })
    );
  }
}
