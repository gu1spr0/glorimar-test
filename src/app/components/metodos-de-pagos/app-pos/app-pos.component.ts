import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { PaymentService } from 'src/app/servicios/payment.service';
import {
  Init,
  Chip,
  Contactless,
  Cancel,
  Close,
  Suscribir,
} from 'src/app/interface/index.payment';
import { Login } from 'src/app/interface/index.api';
import { Item } from 'src/app/interface/item-interface';
import { environment } from 'src/environments/environment';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-pos-root',
  templateUrl: './app-pos.component.html',
  styleUrls: ['./app-pos.component.css'],
})
export class AppPosComponent implements OnInit {
  title = 'front-pos';
  vMonto = 0;
  vIdKiosco = 0;
  vIdBranch = 0;
  vTransaccion = 0;
  vTipo: Item[];
  vInicial = 'Seleccione opción';
  vConexion = false;
  banderaEstado: boolean = false;
  public vSeleccion: number = 0;

  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(
    private _auth: AuthenticationService,
    private _payment: PaymentService
  ) {
    this.vIdKiosco = environment.idKiosco;
    this.vIdBranch = environment.idBranch;
    //Solicitamos token
    let vUsername = environment.usuarioPos;
    let vPassword = environment.passowordPos;
    let login: Login = {
      username: vUsername,
      password: vPassword,
    };
    this._auth.login(login);
  }
  ngOnInit() {
    this.vMonto = Number(
      this.encryptLocalstorage.getItem('deudaMonto').toFixed(2)
    );
  }

  onKeyMonto(event: any) {
    this.vMonto = Number(event.target.value);
  }

  onKeyTransaction(event: any) {
    this.vTransaccion = Number(event.target.value);
  }

  pagar() {
    this.banderaEstado = true;
    switch (this.vSeleccion) {
      case 1:
        /**
         * Inicialización de POS
         */
        let init: Init = {
          token: this._auth.getUserToken(),
          idKiosk: this.vIdKiosco,
          confirm: true,
          multi: false,
        };
        this._payment.sendInit(init);
        break;
      case 2:
        /**
         * Pago con chip
         */
        if (this.vMonto != 0 && this.vMonto != null) {
          let chip: Chip = {
            token: this._auth.getUserToken(),
            idKiosk: this.vIdKiosco,
            amount: this.vMonto,
            multi: false,
          };
          this._payment.sendChip(chip);
        }
        break;
      case 3:
        /**
         * Pago sin contacto
         */
        if (this.vMonto != 0 && this.vMonto != null) {
          let contactless: Contactless = {
            token: this._auth.getUserToken(),
            idKiosk: this.vIdKiosco,
            amount: this.vMonto,
            multi: false,
          };
          this._payment.sendContactless(contactless);
        }
        break;
      case 4:
        /**
         * Cancelar de pago
         */
        if (this.vTransaccion >= 0) {
          let cancel: Cancel = {
            token: this._auth.getUserToken(),
            idKiosk: this.vIdKiosco,
            idTransaction: this.vTransaccion,
            multi: false,
          };
          this._payment.sendCancel(cancel);
        }
        break;
      case 5:
        /**
         * Cierre de lote
         */
        let close: Close = {
          token: this._auth.getUserToken(),
          idKiosk: this.vIdKiosco,
          confirm: true,
          multi: false,
        };
        this._payment.sendClose(close);
        break;
      default:
        /**
         * Ninguna opción
         */
        console.log('Operación no válida');
        break;
    }
  }
  select(data: string) {
    this.vSeleccion = Number(data);
  }

  ngOnDestroy() { 
    this._payment.closeSocket();
  }
}
