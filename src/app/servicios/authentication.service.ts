import { Injectable } from '@angular/core';
import { VarApis, VarLocalStorage } from 'src/app/settings/index.var';
import { ApiService } from 'src/app/servicios/api.service';
import { Login } from 'src/app/interface/index.api';
import { Suscribir } from '../interface/subscribe-interface';
import { environment } from 'src/environments/environment';
import { PaymentService } from './payment.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _api: ApiService,
    private _payment: PaymentService) {}

  /**
   * Login username y password
   * @param login Objeto
   */
  login(login: Login) {
    this._api.postDataValues(VarApis.URL_LOGIN, login).subscribe((response) => {
      if(response) {
        this.sessionStart(response);
        let vIdKiosco = environment.idKiosco;
        let vIdBranch = environment.idBranch;
        let data: Suscribir = {
          token: this.getUserToken(),
          username: this.getUsername(),
          idCommerce: Number(this.getCommerce()),
          idBranch: vIdKiosco,
          idKiosk: vIdBranch,
        };
        this._payment.inicializarSocket(data);
      }
    });
  }

  /**
   * Salir de la aplicación
   */
  logout() {
    this._api.putDataValues(VarApis.URL_LOGOUT, null).subscribe((response) => {
        console.log('Cerraste sesión');
    });
  }

  /**
   * Iniciamos la sesión de local storage
   * @param data
   */
  sessionStart(response: any) {
    localStorage.setItem(VarLocalStorage.TOKEN, response.data.token);
    localStorage.setItem(VarLocalStorage.USERNAME, response.data.username);
    localStorage.setItem(VarLocalStorage.COMMERCE, response.data.idCommerce);
  }

  /**
   * Salir de la aplicación
   */
  /*logout() {
    localStorage.clear();
  }*/

  /**
   * Verificamos si el usuario está logueado
   * @returns confirmación de login
   */
  isLoginUser(): boolean {
    return !!localStorage.getItem(VarLocalStorage.TOKEN);
  }

  /**
   * Obtener el token
   * @returns token
   */
  getUserToken() {
    return localStorage.getItem(VarLocalStorage.TOKEN);
  }

  /**
   * Obtener el nombre de usuario
   * @returns username
   */
  getUsername() {
    return localStorage.getItem(VarLocalStorage.USERNAME);
  }

  /**
   * Obtener el comercio del usuario
   * @returns comercio
   */
  getCommerce() {
    return localStorage.getItem(VarLocalStorage.COMMERCE);
  }
}
