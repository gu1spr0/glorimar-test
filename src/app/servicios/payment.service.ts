import { Injectable } from '@angular/core';
import { WebsocketService } from 'src/app/servicios/websocket.service';
import {
  Init,
  Chip,
  Contactless,
  Cancel,
  Close,
  Suscribir,
} from 'src/app/interface/index.payment';
import { VarApis } from 'src/app/settings/index.var';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  stompClient: any;

  constructor(private _socket: WebsocketService,) {
    this.stompClient = this._socket.connectPos();
  }

  conectar(data: Suscribir) {
    if (data.token) {
      this.stompClient.connectPos(
        { 'X-Authorization': 'Bearer ' + data.token },
        (frame: any) => {
          let cadenaSubs = `/user/${data.username}/msg/${data.idCommerce}/${data.idBranch}/${data.idKiosk}/${data.idDevice}`;
          this.stompClient.subscribe(cadenaSubs, (notifications: any) => {
            setTimeout(() => {
              console.log(notifications.body);
            }, 300);
          });
        }
      );
    } else {
      setTimeout(() => {
        console.log('No se encuentra Logueado');
      }, 300);
    }
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
      this.stompClient.send(VarApis.MSG_CONTACTLESS, {}, JSON.stringify(contactless));
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

  desconectar() {
    this._socket._disconnect();
  }
}
