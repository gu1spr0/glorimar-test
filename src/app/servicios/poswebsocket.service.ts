import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { VarApis } from 'src/app/settings/index.var';
import { CompatClient } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class Poswebsocket {
  private Url = VarApis.MSG_PRINCIPAL;
  public clientStomp: CompatClient | undefined;
  constructor() {}
  public connect() {
    let socket = new SockJS(this.Url);
    this.clientStomp = Stomp.over(socket);
    return this.clientStomp;
  }
  onMessageReceived(message: any){
    console.log("[Mensaje Recibido]:" + message);
  }
}

