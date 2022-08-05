import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-sub-categorias',
  templateUrl: './sub-categorias.component.html',
  styleUrls: ['sub-categoria.css']
})
export class SubCategoriasComponent implements OnInit {
  listaSubcategoria: any[] = [];
  nombreCategoria: string;
  mensajeError: string;
  bandera: boolean;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private categoriaService: CategoriaService,
    private cookie: NgxSecureCookieService,
  ) {
    this.nombreCategoria = this.encryptLocalstorage.getItem("nombreCategoria");
    this.cargarListaSubcategoria();
  }

  ngOnInit(): void {
    /*  this.timer(); */
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  enviar(idSubcategoria: string, nombreSubcategoria: string) {
    this.encryptLocalstorage.setItem('idSubcategoria',
      idSubcategoria);
    this.encryptLocalstorage.setItem('nombreSubcategoria', nombreSubcategoria);
    this.router.navigate(['catalogo', 'productos'])
  }

  cargarListaSubcategoria() {
    /*  this.timer(); */
    const idCategoria = this.encryptLocalstorage.getItem("idCategoria");
    const data: any = {
      codigoKiosko: this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      idempresa: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
    };
    this.categoriaService.listadoCategorias(data)
      .subscribe(
        (response) => {
          this.bandera = false;
          this.listaSubcategoria = response.categorias.filter(categoria => categoria.idpadre == idCategoria);
        },
        (err) => {
          this.bandera = true;
          this.mensajeError = err.error.titulo;
          console.log(err.error.titulo);
        }
      );
  }
}
