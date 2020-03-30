import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { LoggedInUsers } from '../containers/lobby-table/lobby-table.component';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  joinedUsers: BehaviorSubject<LoggedInUsers[]> = new BehaviorSubject<LoggedInUsers[]>([]);

  constructor(private socket: Socket) {
    this.socket.on('userJoined', (message: string) => {
      console.log(message);
    });

    this.socket.on('joinedUsers', (users: LoggedInUsers[]) => {
      this.joinedUsers.next(users);
      console.log(users);
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
}
