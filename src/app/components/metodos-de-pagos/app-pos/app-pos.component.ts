import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-pos-root',
  templateUrl: './app-pos.component.html',
  styleUrls: ['./app-pos.component.css'],
})
export class AppPosComponent implements OnInit {
  token;
  title = 'front-pos';
  vMonto = 0;
  vTransaccion = 0;
  vTipo: Item[];
  vInicial = 'Seleccione opción';
  public vSeleccion: number = 0;
  constructor(
    private _auth: AuthenticationService,
    private _payment: PaymentService
  ) {
    if (this._auth.getUserToken()) {
      this.token = this._auth.getUserToken();
    } else {
      //Solicitamos token
      let data: Login = {
        username: environment.usuarioPos,
        password: environment.passowordPos,
      };
      this._auth.login(data);
      this.token = this._auth.getUserToken();
    }

    //Nos conectamos y suscribimos
    if (this.token) {
      let subscribir: Suscribir = {
        token: this.token,
        username: this._auth.getUsername()!,
        idCommerce: Number(this._auth.getCommerce()),
        idBranch: Number(this._auth.getBranch()),
        idKiosk: Number(this._auth.getKiosk()),
        idDevice: Number(this._auth.getDevice()),
      };
      this._payment.conectar(subscribir);
    }
  }
  ngOnInit() {
    this.vTipo = [
      { label: 'Inicialización', value: 1 },
      { label: 'Pago con chip', value: 2 },
      { label: 'Pago sin contacto', value: 3 },
      { label: 'Cancelar', value: 4 },
      { label: 'Cierre de caja', value: 5 },
    ];
  }

  onKeyMonto(event: any) {
    this.vMonto = Number(event.target.value);
  }

  onKeyTransaction(event: any) {
    this.vTransaccion = Number(event.target.value);
  }

  pagar() {
    switch (this.vSeleccion) {
      case 1:
        /**
         * Inicialización de POS
         */
        let init: Init = {
          token: this.token,
          idKiosk: Number(this._auth.getKiosk()),
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
            token: this.token,
            idKiosk: Number(this._auth.getKiosk()),
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
            token: this.token,
            idKiosk: Number(this._auth.getKiosk()),
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
            token: this.token,
            idKiosk: Number(this._auth.getKiosk()),
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
          token: this.token,
          idKiosk: Number(this._auth.getKiosk()),
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
}
