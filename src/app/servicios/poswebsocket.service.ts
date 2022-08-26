import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { VarApis } from 'src/app/settings/index.var';

@Injectable({
  providedIn: 'root'
})
export class Poswebsocket {
  private Url = VarApis.MSG_PRINCIPAL;
  clientStomp: any;
  constructor() {}
  public connect() {
    let socket = new SockJS(this.Url);
    this.clientStomp = Stomp.over(socket);
    return this.clientStomp;
  }
  _disconnect() {
    if (this.clientStomp !== null) {
      this.clientStomp.disconnect();
    }
    console.log("Disconnected");
  }
  onMessageReceived(message: any){
    console.log("[Mensaje Recibido]:" + message);
  }
}

