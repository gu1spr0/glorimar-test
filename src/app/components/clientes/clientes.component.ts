import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/servicios/validadores.service';
import { DeudaService } from 'src/app/servicios/deuda.service';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-clientes',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './clientes.component.html',
  styleUrls: ['clientes.css']
})
export class ClientesComponent implements OnInit {
  forma: FormGroup;
  codigocliente;
  codigoEmpresa;
  mensajeError;
  erorrListarDeudas: boolean = false;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router, private fb: FormBuilder, private validadores: ValidadoresService, private deudaServ: DeudaService) {
    this.codigoEmpresa = Number(this.encryptLocalstorage.getItem("codigoEmpresa"));
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  get idClienteNoValido() {
    return this.forma.get('idCliente').invalid && this.forma.get('idCliente').touched
  }
  crearFormulario() {
    this.forma = this.fb.group({
      idCliente: ['', Validators.required],
    });

  }

  enviar() {
    this.encryptLocalstorage.setItem('codigocliente', this.forma.get('idCliente').value);
    this.listarDeudas();
  }

  listarDeudas() {
    this.codigocliente = this.forma.get('idCliente').value;
    this.deudaServ.deudas(this.codigocliente, this.codigoEmpresa)
      .subscribe((data: { deudas: any[] }) => {
        this.erorrListarDeudas = false;
        this.guardar();
        this.router.navigate(['persona', 'deudas'])
      }, (error) => {
        console.log("errorrespuestaDeuda", error.error.titulo);
        this.mensajeError = error.error.titulo;
        this.erorrListarDeudas = true;
        this.guardar();
        console.log(this.erorrListarDeudas);
      });
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
  }
}
