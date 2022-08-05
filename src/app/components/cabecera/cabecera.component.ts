import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['cabecera.css']
})
export class CabeceraComponent implements OnInit {
  tipoOperacionKiosko: string;
  currentUrl: string;
  listaPedido: any[] = [];
  banderaCarritoNavegacion: boolean;
  urlImagen: string;
  cantidadCarrito: number = 0;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router) {
    this.urlImagen = this.encryptLocalstorage.getItem("urlImagen");
    this.tipoOperacionKiosko = this.encryptLocalstorage.getItem("tipoOperacionKiosko");
    this.listaPedido = this.encryptLocalstorage.getItem("listaPedido") || null;
    this.hasIdleScreen();
  }

  ngOnInit(): void {
    this.obtenerCantidadCarrito();
  }

  hasIdleScreen() {
    if (this.listaPedido == null) {
      this.listaPedido = [];
    }
    this.currentUrl = this.router.url;
    if ((this.currentUrl === '/catalogo/categorias') || (this.currentUrl === '/catalogo/sub-categorias')
      || (this.currentUrl === '/catalogo/productos') || (this.currentUrl === '/catalogo/producto')) {
      this.banderaCarritoNavegacion = true;
    } else {
      this.banderaCarritoNavegacion = false;
    }
  }

  obtenerCantidadCarrito() {
    const carrito = this.encryptLocalstorage.getItem("carrito")
    this.cantidadCarrito = carrito ? Number(carrito.cantidad) : 0;
  }

  irCarrito() {
    this.router.navigate(['catalogo', 'carrito'])
  }

  irInicio() {
    this.router.navigate(['kiosco', 'pantalla-descanso'])
  }

}
