import {Component, Input } from '@angular/core';

import { SelectService } from '../../../services/select.service';
import { ICard } from '../../../interfaces/icard';

@Component({
  selector: 'app-white-card',
  templateUrl: './white-card.component.html',
  styleUrls: ['./white-card.component.css']
})
export class WhiteCardComponent {
  @Input()
  public card: ICard = {id: '0', content: 'Test White Card' };
  @Input()
  public parentName = '';

  public select = false;

  constructor(private selectService: SelectService) {
    this.selectService.selectSub().subscribe(() => {
      this.select = false;
    });
  }

  selectCard() {
    switch (this.parentName) {
      case 'game':
        this.selectService.selectWhiteCard(this.card.id);
        this.select = true;
        break;
      case 'whiteCardsDeck':
        this.select = this.selectService.multiSelectWhiteCard(this.card.id);
        break;
      default:
        throw new Error('Unvalid parent');
    }
  }
}
