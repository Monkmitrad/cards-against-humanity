import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:4100', options: {} };

import { HttpRequestInterceptor } from './http-request.interceptor';
import { WhiteCardComponent } from '../containers/play-cards/white-card';
import { BlackCardComponent } from '../containers/play-cards/black-card';



@NgModule({
  declarations: [
    WhiteCardComponent,
    BlackCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  exports: [
    WhiteCardComponent,
    BlackCardComponent,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ]
})
export class SharedModule { }
