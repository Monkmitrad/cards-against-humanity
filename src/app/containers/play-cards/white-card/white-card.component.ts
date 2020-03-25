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

  public select = false;

  constructor(private selectService: SelectService) {
    this.selectService.selectSub().subscribe(() => {
      this.select = false;
    });
  }

  selectCard() {
    this.selectService.selectWhiteCard(this.card.id);
    this.select = true;
  }
}
