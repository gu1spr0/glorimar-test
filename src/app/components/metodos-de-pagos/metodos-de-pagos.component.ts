import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-metodos-de-pagos',
  templateUrl: './metodos-de-pagos.component.html',
  styleUrls: []
})
export class MetodosDePagosComponent implements OnInit {

  deudaMonto: string;
  empresa;
  tipoOperacionKiosko: string;
  metodoPago;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.tipoOperacionKiosko = this.encryptLocalstorage.getItem("tipoOperacionKiosko");
    this.deudaMonto = Number(this.encryptLocalstorage.getItem("deudaMonto")).toFixed(2);
    this.empresa = this.encryptLocalstorage.getItem("codigoEmpresa");
  }
  enviarQr() {
    this.router.navigate(['pago', 'qr'])
    this.metodoPago = "qr";
    this.encryptLocalstorage.setItem('metodoPago', this.metodoPago);
  }
  enviarTarjeta() {
    this.router.navigate(['pago', 'formPersona'])
    this.metodoPago = "tarjeta";
    this.encryptLocalstorage.setItem('metodoPago', this.metodoPago);
  }
  enviarPos() {
    this.router.navigate(['pago', 'app-pos'])
    this.metodoPago = "ps";
    this.encryptLocalstorage.setItem('metodoPago', this.metodoPago);
  }
  enviarCaja() {
    this.router.navigate(['pago', 'formPersona'])
    this.metodoPago = "caja";
    this.encryptLocalstorage.setItem('metodoPago', this.metodoPago);
  }
  ngOnInit() {
  }
}
