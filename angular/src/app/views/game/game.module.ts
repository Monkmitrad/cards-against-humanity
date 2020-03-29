import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PlayerTableComponent } from '../../containers/player-table/player-table.component';
import { LobbyComponent } from './lobby/lobby/lobby.component';
import { LobbyTableComponent } from '../../containers/lobby-table/lobby-table.component';

@NgModule({
  imports: [
    FormsModule,
    GameRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    SharedModule
  ],
  declarations: [
    GameComponent,
    PlayerTableComponent,
    LobbyTableComponent,
    LobbyComponent
  ]
})
export class GameModule { }
