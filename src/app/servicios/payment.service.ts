import { Injectable } from '@angular/core';
import {
  Init,
  Chip,
  Contactless,
  Cancel,
  Close,
  Suscribir,
} from 'src/app/interface/index.payment';
import { VarApis } from 'src/app/settings/index.var';
import { Poswebsocket } from './poswebsocket.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  stompClient: any;
  constructor(private _socket: Poswebsocket) {
    this.stompClient = this._socket.connect();
  }

  inicializarSocket(data: Suscribir) {
    if (data.token) {
      this.stompClient.connect(
        { 'X-Authorization': 'Bearer ' + data.token },
        (frame: any) => {
          if (!this.stompClient) {
            return;
          }

          this._subscribeTopic(data);
        }
      );
    }
  }

  private _subscribeTopic(data: Suscribir) {
    if (!this.stompClient) {
      console.error('Error de configuración en websocket.');
      return;
    }

    let cadenaSubs = `/user/${data.username}/msg/${data.idCommerce}/${data.idBranch}/${data.idKiosk}`;
    this.stompClient.subscribe(cadenaSubs, (notifications: any) => {
      if(notifications.body) {
        console.log(notifications.body);
      }
    });
  }

  sendInit(init: Init) {
    setTimeout(() => {
      this.stompClient.send(VarApis.MSG_INIT, {}, JSON.stringify(init));
    }, 3000);
  }

  sendChip(chip: Chip) {
    setTimeout(() => {
      this.stompClient.send(VarApis.MSG_CHIP, {}, JSON.stringify(chip));
    }, 3000);
  }

  sendContactless(contactless: Contactless) {
    setTimeout(() => {
      this.stompClient.send(
        VarApis.MSG_CONTACTLESS,
        {},
        JSON.stringify(contactless)
      );
    }, 3000);
  }

  sendCancel(cancel: Cancel) {
    setTimeout(() => {
      this.stompClient.send(VarApis.MSG_CANCEL, {}, JSON.stringify(cancel));
    }, 3000);
  }

  sendClose(close: Close) {
    setTimeout(() => {
      this.stompClient.send(VarApis.MSG_CLOSE, {}, JSON.stringify(close));
    }, 3000);
  }

  closeSocket() {
    this.stompClient.disconnect();
  }
}
