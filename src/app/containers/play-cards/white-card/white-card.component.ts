import {Component } from '@angular/core';
import { SelectService } from '../../../services/select.service';

@Component({
  selector: 'app-white-card',
  templateUrl: './white-card.component.html',
  styleUrls: ['./white-card.component.css']
})
export class WhiteCardComponent {
  public select = false;

  constructor(private selectService: SelectService) {
    this.selectService.selectSub().subscribe(() => {
      this.select = false;
    });
  }

  selectCard() {
    this.selectService.selectWhiteCard();
    this.select = true;
  }
}
