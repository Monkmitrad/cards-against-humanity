import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) { }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  joinGame(username: string): void {
    this.socket.emit('joinGame', username);
  }

  getLoggedInUsers(): string[] {
    return null;
  }
}
