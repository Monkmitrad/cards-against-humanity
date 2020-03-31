import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { LoggedInUsers } from '../containers/lobby-table/lobby-table.component';
import { GameStatus } from '../models/game-status.enum';
import { IGameInfo } from '../interfaces/igame-info';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  joinedUsers: BehaviorSubject<LoggedInUsers[]> = new BehaviorSubject<LoggedInUsers[]>([]);
  gameStatus: BehaviorSubject<GameStatus> = new BehaviorSubject<GameStatus>(GameStatus.NotStarted);
  gameInfo: BehaviorSubject<IGameInfo> = new BehaviorSubject<IGameInfo>(null);

  constructor(private socket: Socket) {
    this.socket.on('userJoined', (message: string) => {
      console.log(message);
    });

    this.socket.on('joinedUsers', (users: LoggedInUsers[]) => {
      this.joinedUsers.next(users);
    });

    this.socket.on('status', (status: GameStatus) => {
      this.gameStatus.next(status);
    });

    this.socket.on('gameUpdate', (ingameInfo: IGameInfo) => {
      this.gameInfo.next(ingameInfo);
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
}
