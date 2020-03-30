import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameGuard implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    console.log(route.url);
    return this.apiService.getGameStatus().pipe(
      take(1),
      map((data) => {
        console.log(data);
        switch (data) {
          case 'notStarted':
            return this.router.createUrlTree(['/lobby']);
          case 'started':
            return true;
          default:
            return this.router.createUrlTree(['/lobby']);
        }
      })
    );
  }
}
