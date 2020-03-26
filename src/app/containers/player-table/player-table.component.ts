import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllUsers();
  }
}
