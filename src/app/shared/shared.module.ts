import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhiteCardComponent } from '../containers/play-cards/white-card';
import { BlackCardComponent } from '../containers/play-cards/black-card';



@NgModule({
  declarations: [
    WhiteCardComponent,
    BlackCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WhiteCardComponent,
    BlackCardComponent
  ]
})
export class SharedModule { }
