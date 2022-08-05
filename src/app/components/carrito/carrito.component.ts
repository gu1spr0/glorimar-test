import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['carrito.css']
})
export class CarritoComponent implements OnInit {
  listaPedido: any[];
  totalCarrito = 0;
  monedaCarrito: string;
  cantidadCarrito: number = 0;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(
    private router: Router,
  ) {
    this.traerListaPedido();
    this.totalCompraCarrito();
  }

  ngOnInit(): void {
  }

  traerListaPedido() {
    this.listaPedido = this.encryptLocalstorage.getItem("listaPedido") || null;
  }

  totalCompraCarrito() {
    if (this.listaPedido != null) {
      this.monedaCarrito = this.encryptLocalstorage.getItem("carrito")["moneda"];
      this.totalCarrito = this.encryptLocalstorage.getItem("carrito")["total"];
      this.cantidadCarrito = this.encryptLocalstorage.getItem("carrito")["cantidad"];
      this.encryptLocalstorage.setItem('deudaMonto', this.totalCarrito);
    }
  }

  eliminarItemCarrito(indexCarrito: number) {
    if (this.listaPedido.length != 0) {
      this.listaPedido.splice(indexCarrito, 1);
      this.encryptLocalstorage.setItem('listaPedido', JSON.stringify(this.listaPedido));
      this.actualizarCarrito();
      this.totalCompraCarrito();
    }
    if (this.listaPedido.length === 0) {
      this.totalCarrito = 0;
      this.encryptLocalstorage.removeItem('carrito')
    }
  }

  actualizarCarrito() {
    if (this.listaPedido.length != 0) {
      this.totalCarrito = 0;
      this.cantidadCarrito = 0;
      for (var i in this.listaPedido) {
        this.totalCarrito += this.listaPedido[i].totalPagar;
        this.cantidadCarrito += this.listaPedido[i].cantidadItem;
      }
      this.encryptLocalstorage.setItem('carrito', {
        'moneda': this.monedaCarrito,
        'total': this.totalCarrito,
        'cantidad': this.cantidadCarrito,
      });
    }
  }

  irProducto(idItem: string, idSubcategoria: string) {
    this.encryptLocalstorage.setItem('idItem', idItem);
    this.encryptLocalstorage.setItem('idSubcategoria', idSubcategoria);
    this.router.navigate(['catalogo', 'producto']);
  }

  continuar() {
    const listaPedido: any[] = this.encryptLocalstorage.getItem("listaPedido") || [];
    if (listaPedido.length > 0) {
      this.router.navigate(['pago', 'metodos-de-pago'])
    } else {
      this.router.navigate(['catalogo', 'categorias'])
    }
  }

  anadirproducto() {
    this.router.navigate(['catalogo', 'categorias'])
  }

}
