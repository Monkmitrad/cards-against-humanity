import {Component } from '@angular/core';

import { ICard } from '../../../interfaces/icard';

@Component({
  selector: 'app-black-card',
  templateUrl: './black-card.component.html',
  styleUrls: ['./black-card.component.css']
})
export class BlackCardComponent {
  public card: ICard = { id: '1', content: 'Test Black Card'};
}
