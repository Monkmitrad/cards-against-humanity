import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecksComponent } from './decks.component';
import { DecksRoutingModule } from './decks-routing.module';
import { WhiteCardsComponent } from './white/white-cards/white-cards.component';
import { BlackCardsComponent } from './black/black-cards/black-cards.component';
import { SharedModule } from '../../shared/shared.module';
import { httpInterceptorProviders } from '../../shared';


@NgModule({
    imports: [
        DecksRoutingModule,
        CommonModule,
        SharedModule,
    ],
    declarations: [
        DecksComponent,
        WhiteCardsComponent,
        BlackCardsComponent,
    ],
    providers: [
        httpInterceptorProviders
    ]
})
export class DecksModule {

}
