import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { BnbService } from 'src/app/servicios/bnb.service';
import { ValidadoresService } from 'src/app/servicios/validadores.service';

@Component({
  selector: 'app-enviar-qr',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './enviar-qr.component.html',
  styleUrls: ['enviar-qr.css']
})
export class EnviarQrComponent implements OnInit {
  forma: FormGroup;
  idCliente;
  idEmpresa;
  nombreCliente;
  referenceNumber;
  emailCliente;
  banderaEstadoEnvioCorreo: boolean = false;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private bnbS: BnbService,
    private fb: FormBuilder,
    private validadores: ValidadoresService) {
    this.idEmpresa = Number(this.encryptLocalstorage.getItem("codigoEmpresa"));
    this.idCliente = Number(this.encryptLocalstorage.getItem("cliente")["id"]);
    this.nombreCliente = this.encryptLocalstorage.getItem("cliente")["nombre"];
    this.emailCliente = this.encryptLocalstorage.getItem("cliente")["email"];
    this.crearFormulario();

  }

  ngOnInit() {
    this.timer();
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  crearFormulario() {
    this.forma = this.fb.group({
      emailCliente: ['', [Validators.required, Validators.email]],
    });
  }
  get emailClienteNoValido() {
    return this.forma.get('emailCliente').invalid && this.forma.get('emailCliente').touched
  }

  enviarQr() {
    this.timer()
    const data: any = {
      email: this.emailCliente,
      idEmpresa: this.idEmpresa,
      idcliente: this.idCliente,
      nombreCliente: this.nombreCliente,
      referenceNumber: this.referenceNumber,
    };
    this.bnbS.enviarQrEmail(data)
      .subscribe(
        (response) => {
          this.banderaEstadoEnvioCorreo = true;
        },
        (err) => {
          console.log(err);
        }
      );
  }


}
