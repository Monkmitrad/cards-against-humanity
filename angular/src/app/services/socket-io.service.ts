import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  joinedUsers: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private socket: Socket) {
    this.socket.on('userJoined', (message: string) => {
      console.log(message);
    });

    this.socket.on('joinedUsers', (users: string[]) => {
      this.joinedUsers.next(users);
    });
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }
}
