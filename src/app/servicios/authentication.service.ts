import { Injectable } from '@angular/core';
import { VarApis, VarLocalStorage } from 'src/app/settings/index.var';
import { ApiService } from 'src/app/servicios/api.service';
import { Login } from 'src/app/interface/index.api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _api: ApiService,
  ) { }

  /**
   * Login username y password
   * @param login Objeto
   */
  login(login: Login) {
    this._api
      .postDataValues(VarApis.URL_LOGIN, login)
      .subscribe(response => {
        this.sessionStart(response);
        setTimeout(() => {
          console.log(response.message);
        }, 300);
      })
  }

  /**
   * Salir de la aplicación
   */
  logout() {
    this._api
      .putDataValues(VarApis.URL_LOGIN, null)
      .subscribe(response => {
        setTimeout(() => {
          console.log("Cerraste sesión");
        }, 300)
      })
      localStorage.clear();
  }

  /**
   * Iniciamos la sesión de local storage
   * @param data
   */
  sessionStart(response: any) {
    localStorage.setItem(VarLocalStorage.TOKEN, response.data.token);
    localStorage.setItem(VarLocalStorage.USERNAME, response.data.username);
    localStorage.setItem(VarLocalStorage.COMMERCE, response.data.idCommerce);
    localStorage.setItem(VarLocalStorage.BRANCH, response.data.idBranch);
    localStorage.setItem(VarLocalStorage.KIOSK, response.data.idKiosk);
    localStorage.setItem(VarLocalStorage.DEVICE, response.data.idDevice);

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

  /**
   * Obtener la sucursal del usuario
   * @returns sucursal
   */
  getBranch() {
    return localStorage.getItem(VarLocalStorage.BRANCH);
  }

  /**
   * Obtener el kiosco del usuario
   * @returns kiosco
   */
  getKiosk() {
    return localStorage.getItem(VarLocalStorage.KIOSK);
  }

  /**
   * Obtener el dispositivo del usuario
   * @returns dispositivo
   */
  getDevice() {
    return localStorage.getItem(VarLocalStorage.DEVICE);
  }

}
