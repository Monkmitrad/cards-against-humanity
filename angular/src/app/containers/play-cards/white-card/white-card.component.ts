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
  public card: ICard = {_id: '0', content: 'Test White Card' };
  @Input()
  public parentName = '';
  @Input()
  public canSelect = true;

  public select = false;

  constructor(private selectService: SelectService) {
    this.selectService.selectSub().subscribe(() => {
      this.select = false;
    });
  }

  selectCard() {
    switch (this.parentName) {
      case 'playedCard':
        if (this.canSelect) {
          this.selectService.selectWinnerCard(this.card._id);
          this.select = true;
        }
        break;
      case 'game':
        if (this.canSelect) {
          this.selectService.selectWhiteCard(this.card._id);
          this.select = true;
        }
        break;
      case 'whiteCardsDeck':
        this.select = this.selectService.multiSelectWhiteCard(this.card._id);
        break;
      default:
        throw new Error('Unvalid parent');
    }
  }
}
