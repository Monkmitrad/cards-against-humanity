import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { LoggedInUsers } from '../containers/lobby-table/lobby-table.component';
import { GameStatus } from '../models/game-status.enum';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  joinedUsers: BehaviorSubject<LoggedInUsers[]> = new BehaviorSubject<LoggedInUsers[]>([]);
  gameStatus: BehaviorSubject<GameStatus> = new BehaviorSubject<GameStatus>(GameStatus.NotStarted);

  constructor(private socket: Socket) {
    this.socket.on('userJoined', (message: string) => {
      console.log(message);
    });

    this.socket.on('joinedUsers', (users: LoggedInUsers[]) => {
      this.joinedUsers.next(users);
    });

    this.socket.on('status', (status: string) => {
      this.gameStatus.next(GameStatus[status]);
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
}
