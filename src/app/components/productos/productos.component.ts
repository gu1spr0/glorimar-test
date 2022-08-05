import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductoService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['productos.css']
})
export class ProductosComponent implements OnInit {
  listaProductos: any[] = [];
  nombreSubcategoria: string;
  nombreCategoria: string;
  mensajeError: string;
  bandera: boolean;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private productoService: ProductoService,
    private cookie: NgxSecureCookieService
  ) {
    this.nombreCategoria = this.encryptLocalstorage.getItem("nombreCategoria");
    this.nombreSubcategoria = this.encryptLocalstorage.getItem("nombreSubcategoria");
    this.cargarListaProductos();
  }

  ngOnInit(): void {
    /*   this.timer(); */
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  enviar(idItem: string) {
    this.encryptLocalstorage.setItem('idItem', idItem);
    this.router.navigate(['catalogo', 'producto'])
  }

  cargarListaProductos() {
    /*  this.timer(); */
    const data: any = {
      codigoKiosko: this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      idempresa: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
      idcategoria: Number(this.encryptLocalstorage.getItem("idSubcategoria")),
    };
    this.productoService.listadoProductos(data)
      .subscribe(
        (response) => {
          this.bandera = false;
          this.listaProductos = response.items;
        },
        (err) => {
          this.bandera = true;
          this.mensajeError = err.error.titulo;
          console.log(err.error.titulo);
        }
      );
  }

}
