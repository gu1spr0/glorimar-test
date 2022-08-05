import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['producto.css']
})
export class ProductoComponent implements OnInit {
  nombreCategoria: string;
  nombreSubcategoria: string;
  idSubcategoria: string;
  idItem: number;
  pedidoProducto: any[] = [];
  listaPedido: any[] = [];
  productoNombre: any;
  productoImagen: any;
  productoPrecio: any;
  productoMoneda: any;
  productoDescripcion: any;
  productoCantidad: number = 1;
  cantidadCarrito: number = 0;
  totalCarrito: number = 0;
  monedaCarrito: string;
  banderaAgregarItem: boolean = false;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private productoService: ProductoService,
    private cookie: NgxSecureCookieService
  ) {
    this.nombreCategoria = this.encryptLocalstorage.getItem("nombreCategoria");
    this.idSubcategoria = this.encryptLocalstorage.getItem("idSubcategoria");
    this.nombreSubcategoria = this.encryptLocalstorage.getItem("nombreSubcategoria");
    this.idItem = this.encryptLocalstorage.getItem("idItem");
    this.cargarProducto();
  }

  ngOnInit(): void {
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  anadirCarrito() {
    this.anadirPedidoCarrito();
  }

  pagar() {
    this.router.navigate(['catalogo', 'carrito'])
  }

  anadirPedidoCarrito() {
    this.traerListaPedidoLocalstore();
    if (this.listaPedido == null) {
      this.inicializarListaPedido();
      this.banderaAgregarItem = true;
    }
    else {
      this.anadirListaPedido();
      this.banderaAgregarItem = true;
    }
    this.actualizarCarrito();
  }

  traerListaPedidoLocalstore() {
    this.listaPedido = this.encryptLocalstorage.getItem("listaPedido") || null;
  }

  inicializarListaPedido() {
    this.listaPedido = [{
      idItem: this.idItem,
      nombreItem: this.productoNombre,
      cantidadItem: this.productoCantidad,
      descripcionItem: this.productoDescripcion,
      precioItem: this.productoPrecio,
      monedaItem: this.productoMoneda,
      imagenItem: this.productoImagen,
      idSubcategoria: this.idSubcategoria,
      totalPagar: this.productoCantidad * this.productoPrecio,
    }];
    this.actualizarListapedidoLocalstore();
  }

  anadirListaPedido() {
    this.aumentarCantidadListaPedido();
    this.aumentarItemListaPedido();
    this.actualizarListapedidoLocalstore();
  }

  actualizarListapedidoLocalstore() {
    this.encryptLocalstorage.setItem('listaPedido', JSON.stringify(this.listaPedido));
  }

  cargarProducto() {
    /*  this.timer(); */
    const data: any = {
      codigoKiosko: this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      idempresa: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
      idcategoria: Number(this.encryptLocalstorage.getItem("idSubcategoria")),
    };
    this.productoService.listadoProductos(data)
      .subscribe(
        (response) => {
          const producto: any[] = response.items.filter(item => item.iditem == this.idItem);
          this.productoNombre = producto[0].nombre;
          this.productoImagen = producto[0].imagen;
          this.productoPrecio = producto[0].precio;
          this.productoMoneda = producto[0].moneda;
          this.productoDescripcion = producto[0].descripcion;
          this.cargarCantidadProdSelCarrito();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  actualizarCarrito() {
    this.actualizarContadorCarrito();
  }

  actualizarContadorCarrito() {
    for (var i in this.listaPedido) {
      this.cantidadCarrito += this.listaPedido[i].cantidadItem;
    }
    this.actualizarMontoTotalCarrito();
  }

  actualizarMontoTotalCarrito() {
    if (this.listaPedido.length != 0) {
      this.totalCarrito = 0;
      this.monedaCarrito = this.listaPedido[0].monedaItem;
      for (var i in this.listaPedido) {
        this.totalCarrito += Number(this.listaPedido[i].totalPagar);
      }
      this.encryptLocalstorage.setItem('carrito', {
        'moneda': this.monedaCarrito,
        'total': this.totalCarrito,
        'cantidad': this.cantidadCarrito,
      });
    }
  }

  aumentarCantidadListaPedido() {
    for (var i in this.listaPedido) {
      if (this.listaPedido[i].idItem == this.idItem) {
        this.listaPedido[i].cantidadItem = this.productoCantidad;
        this.listaPedido[i].totalPagar = (Number(this.listaPedido[i].precioItem) * this.productoCantidad);
      }
    }
  }

  aumentarItemListaPedido() {
    if (this.listaPedido.filter(listaPedidoAx => (listaPedidoAx.idItem == this.idItem)).length == 0) {
      this.listaPedido.push({
        idItem: this.idItem,
        nombreItem: this.productoNombre,
        cantidadItem: this.productoCantidad,
        descripcionItem: this.productoDescripcion,
        precioItem: this.productoPrecio,
        monedaItem: this.productoMoneda,
        imagenItem: this.productoImagen,
        idSubcategoria: this.idSubcategoria,
        totalPagar: this.productoCantidad * this.productoPrecio,
      }
      );
    }
  }

  cargarCantidadProdSelCarrito() {
    this.traerListaPedidoLocalstore();
    if (this.listaPedido != null) {
      for (var i in this.listaPedido) {
        if (this.listaPedido[i].idItem == this.idItem) {
          this.productoCantidad = this.listaPedido[i].cantidadItem;
        }
      }
    }
  }

  plus() {
    this.productoCantidad++;
  }

  minus() {
    if (this.productoCantidad > 1) {
      this.productoCantidad--;
    }
  }

}
