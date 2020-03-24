import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ICard } from '../../../../interfaces/icard';

@Component({
  selector: 'app-white-cards',
  templateUrl: './white-cards.component.html',
  styleUrls: ['./white-cards.component.css']
})
export class WhiteCardsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addCard() {
    this.apiService.addWhiteCard({id: 1, content: 'Test'});
  }

  getCards() {
    this.apiService.getWhiteCards().subscribe((data: ICard[]) => {
      data.forEach((card: ICard) => {
        console.log(card.content);
      });
    });
  }
}
