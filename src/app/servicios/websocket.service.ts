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
  stompClient: any;
  appComponent: QrComponent;
  public connect() {
    let socket = new SockJS(this.Url + '/socket-endpoint');
    console.log(this.Url + '/socket-endpoint');
    this.stompClient = Stomp.over(socket);
    return this.stompClient;
  }
  _send(message, cliente) {
    console.log("calling logout api via web socket");
    this.stompClient.send('/pgt360/qr', {}, JSON.stringify({ 'name': cliente, 'data': message }));
  }
  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }
  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    this.appComponent.Message(message);
  }
}

