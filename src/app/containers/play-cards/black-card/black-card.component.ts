import {Component, Input } from '@angular/core';

import { ICard } from '../../../interfaces/icard';
import { SelectService } from '../../../services/select.service';

@Component({
  selector: 'app-black-card',
  templateUrl: './black-card.component.html',
  styleUrls: ['./black-card.component.css']
})
export class BlackCardComponent {
  @Input()
  public parentName: string = '';
  @Input()
  public card: ICard = { id: '1', content: 'Test Black Card'};

  public select = false;

  constructor(private selectService: SelectService) { }

  selectCard() {
    if (this.parentName === 'blackCardsDeck') {
      this.select = this.selectService.multiSelectWhiteCard(this.card.id);
    }
  }
}
