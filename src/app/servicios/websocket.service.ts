import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { QrComponent } from '../components/metodos-de-pagos/qr/qr.component';
import { VarApis } from 'src/app/settings/index.var';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private Url = environment.URLsocket;
  private UrlPos = VarApis.MSG_PRINCIPAL;
  stompClient: any;
  appComponent: QrComponent;
  public connect() {
    let socket = new SockJS(this.Url + '/socket-endpoint');
    console.log(this.Url + '/socket-endpoint');


    this.stompClient = Stomp.over(socket);

    return this.stompClient;
  }
  public connectPos() {
    let socket = new SockJS(this.UrlPos);
    console.log(this.UrlPos);
    this.stompClient = Stomp.over(socket);
    return this.stompClient;
  }
  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }
  _send(message, cliente) {
    console.log("calling logout api via web socket");
    this.stompClient.send('/pgt360/qr', {}, JSON.stringify({ 'name': cliente, 'data': message }));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    this.appComponent.Message(message);
  }
}

