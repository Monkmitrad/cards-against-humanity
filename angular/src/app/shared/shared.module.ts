import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpRequestInterceptor } from './http-request.interceptor';
import { WhiteCardComponent } from '../containers/play-cards/white-card';
import { BlackCardComponent } from '../containers/play-cards/black-card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    WhiteCardComponent,
    BlackCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
