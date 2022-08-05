import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ModalDirective } from 'ng-uikit-pro-standard';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { ValidadoresService } from 'src/app/servicios/validadores.service';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { ModalCodigoEmpresaComponent } from '../modal-codigo-empresa/modal-codigo-empresa.component';
import { EncryptStorage } from 'encrypt-storage';


@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['empresas.css']
})
export class EmpresasComponent implements OnInit {
  txtInicioBusqueda: string = "";
  listaempresa: any[] = [];
  codigoEmpresa: string;
  nombreEmpresa: string;
  tipoOperacionKiosko: string;
  urlImagen: string;
  forma: FormGroup;
  mensajeError: string;
  bandera: boolean = false;
  val;
  banderaCodigoEmpresa: boolean = false;
  encryptLocalstorage = EncryptStorage('Secret_key'); // storageType: localStorage(default)
  // @ViewChild('modalCodigoEmpresa', { static: false }) modalCodigoEmpresa: ModalDirective;
  // form: FormGroup;
  modalRef: MDBModalRef;
  constructor(private router: Router,
    private fb: FormBuilder,
    private validadores: ValidadoresService,
    private empresaServ: EmpresaService,
    private spinner: NgxSpinnerService,
    private cookie: NgxSecureCookieService,
    private modalService: MDBModalService,
  ) {
    // this.form = new FormGroup({
    //   'codigo': new FormControl(null, [Validators.required])
    // });
    this.crearFormulario();
    this.cargarEmpresasInicio();
    // this.verificarCookie();
  }

  verificarCookie() {
    const test = this.cookie.get("test", true);
    if (!test) {
      this.showModalCodEmp();
    } else {
      return;
    }
  }

  ngOnInit(): void {
    /*  this.timer(); */
    this.modalService.close.subscribe(() => {
      this.cargarEmpresasInicio();
    });
    this.encryptLocalstorage.clear();
  }

  showModalCodEmp() {
    this.modalRef = this.modalService.show(ModalCodigoEmpresaComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-lg',
      containerClass: '',
      animated: false
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      idEmpresa: ['', Validators.required],
    });
  }

  cargarEmpresasInicio() {
    /*  this.timer(); */
    const data: any = {
      codigoKiosko: this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      textoBusqueda: this.txtInicioBusqueda,
    };
    this.empresaServ.listadoEmpresas(data)
      .subscribe(
        (response) => {
          this.listaempresa = response.empresas;
          this.bandera = false;
        },
        (err) => {
          console.log(err);
          this.bandera = true;
          this.mensajeError = err.error.titulo;
          this.showModalCodEmp();
        }
      );
  }

  listadoEmpresas() {
    /* this.timer(); */
    const data: any = {
      codigoKiosko: this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      textoBusqueda: this.forma.get('idEmpresa').value,
    };
    this.empresaServ.listadoEmpresas(data)
      .subscribe(
        (response) => {
          this.listaempresa = response.empresas;
          this.bandera = false;
        },
        (err) => {
          console.log(err);
          this.bandera = true;
          this.mensajeError = err.error.titulo;
          this.showModalCodEmp();
        }
      );
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  enviar(codigoEmpresa: string, urlImagen: string, tipoOperacionKiosko: string, nombreEmpresa: string) {
    this.codigoEmpresa = codigoEmpresa;
    this.nombreEmpresa = nombreEmpresa;
    this.urlImagen = urlImagen;
    this.tipoOperacionKiosko = tipoOperacionKiosko;
    this.encryptLocalstorage.setItem('codigoEmpresa', this.codigoEmpresa);
    this.encryptLocalstorage.setItem('nombreEmpresa', this.nombreEmpresa);
    this.encryptLocalstorage.setItem('tipoOperacionKiosko', this.tipoOperacionKiosko);
    this.encryptLocalstorage.setItem('urlImagen', this.urlImagen);
    this.tipoOperacion();
  }

  tipoOperacion() {
    if (this.tipoOperacionKiosko == "COBRANZA") {
      this.router.navigate(['persona', 'clientes']);
    }
    if (this.tipoOperacionKiosko == "ECOMMERCE") {
      this.router.navigate(['catalogo', 'categorias']);
    }

  }
}
