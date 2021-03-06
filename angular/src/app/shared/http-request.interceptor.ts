import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        // exclude auth requests
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({setHeaders: {
          Authorization: 'Bearer ' + user.token
        }});
        return next.handle(modifiedRequest);
      })
    );
  }
}
