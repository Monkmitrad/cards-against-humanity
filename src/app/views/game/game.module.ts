import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { WhiteCardComponent } from '../../containers/play-cards/white-card';
import { BlackCardComponent } from '../../containers/play-cards/black-card';

@NgModule({
  imports: [
    FormsModule,
    GameRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    GameComponent,
    WhiteCardComponent,
    BlackCardComponent,
  ]
})
export class GameModule { }
