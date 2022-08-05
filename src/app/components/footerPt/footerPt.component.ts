import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-footerPt',
  templateUrl: './footerPt.component.html',
  styleUrls: []
})
export class FooterPtComponent implements OnInit {

  tipoOperacionKiosko: string;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router,
    private _location: Location) {
    this.tipoOperacionKiosko = this.encryptLocalstorage.getItem("tipoOperacionKiosko");
  }

  ngOnInit(): void {
  }

  regresar() {
    this.tipoOperacion();
  }

  tipoOperacion() {
    if (this.tipoOperacionKiosko == "COBRANZA") {
      window.history.back();
    }
    if (this.tipoOperacionKiosko == "ECOMMERCE") {
      if (this.router.url === '/catalogo/categorias') {
        this.router.navigate(['kiosco', 'empresas']);
      } else {
        if (this.router.url.includes('/pago/')) {
          window.history.back();
        } else {
          this.router.navigate(['catalogo', 'categorias']);
        }
      }
    }
  }

  enviar() {
    this.router.navigate(['persona', 'clientes'])
  }



}
