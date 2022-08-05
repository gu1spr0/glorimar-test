import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-modal-codigo-empresa',
  templateUrl: './modal-codigo-empresa.component.html',
  styleUrls: ['./modal-codigo-empresa.component.css']
})
export class ModalCodigoEmpresaComponent implements OnInit {
  form: FormGroup;
  banderaCodigoEmpresa: boolean = false;
  constructor(
    public modalRef: MDBModalRef,
    private cookie: NgxSecureCookieService,
    private modalService: MDBModalService,
  ) {
    this.form = new FormGroup({
      'codigo': new FormControl(null, [Validators.required])
    });
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

  enviarCodigoEmpresa() {
    var codigo = this.form.value.codigo;
    var key = this.cookie.generateKey();
    this.cookie.set("key", "test value", true, key, 1825);
    this.cookie.set("codigoEmpresa", codigo, true, this.cookie.get("key", false), 1825);
    this.modalRef.hide();
  }

  ngOnInit(): void {
  }

}
