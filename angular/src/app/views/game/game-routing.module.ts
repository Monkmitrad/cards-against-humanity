import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';
import { LobbyComponent } from './lobby/lobby/lobby.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    data: {
      title: 'Cards Against Humanity'
    }
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    data: {
      title: 'Cards Against Humanity'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {}
