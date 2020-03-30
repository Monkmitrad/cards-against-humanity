import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby/lobby.component';
import { GameGuard } from '../../guards/game.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lobby',
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    data: {
      title: 'Cards Against Humanity'
    }
  },
  {
    path: 'ingame',
    component: GameComponent,
    canActivate: [GameGuard],
    data: {
      title: 'Cards Against Humanity'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
