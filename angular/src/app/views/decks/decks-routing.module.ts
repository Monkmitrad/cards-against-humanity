import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecksComponent } from './decks.component';
import { BlackCardsComponent } from './black/black-cards/black-cards.component';
import { WhiteCardsComponent } from './white/white-cards/white-cards.component';

const routes: Routes = [
  {
    path: '',
    component: DecksComponent,
    data: {
      title: 'Cards Against Humanity'
    },
  },
  {
      path: 'white',
      component: WhiteCardsComponent
  },
  {
      path: 'black',
      component: BlackCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecksRoutingModule {}

