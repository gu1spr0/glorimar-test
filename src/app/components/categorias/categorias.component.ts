import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { CategoriaService } from '../../servicios/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['categorias.css']
})
export class CategoriasComponent implements OnInit {
  listaCategoria: any[] = [];
  mensajeError: string;
  bandera: boolean;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private categoriaService: CategoriaService,
    private cookie: NgxSecureCookieService,
  ) {
    this.cargarListaCategoria();
  }

  ngOnInit(): void {
    /* this.timer(); */
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  enviar(idCategoria: string, nombreCategoria: string) {
    this.encryptLocalstorage.setItem('idCategoria', idCategoria);
    this.encryptLocalstorage.setItem('nombreCategoria', nombreCategoria);
    this.router.navigate(['catalogo', 'sub-categorias'])
  }

  cargarListaCategoria() {
    /*   this.timer(); */
    const data: any = {
      codigoKiosko: this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      idempresa: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
    };
    this.categoriaService.listadoCategorias(data)
      .subscribe(
        (response) => {
          this.bandera = false;
          this.listaCategoria = response.categorias.filter(categoria => categoria.idpadre == null);
        },
        (err) => {
          this.bandera = true;
          this.mensajeError = err.error.titulo;
          console.log(err.error.titulo);

        }
      );
  }

}
