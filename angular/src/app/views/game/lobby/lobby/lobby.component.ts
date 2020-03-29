import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../../../services/socket-io.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor(private socketService: SocketIoService) { }

  ngOnInit(): void {
  }

  onJoinGame(): void {
    this.socketService.joinGame();
  }
}
