import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeudaService } from '../../servicios/deuda.service';

@Component({
  selector: 'app-deudas',
  templateUrl: './deudas.component.html',
  styleUrls: ['deudas.css']
})
export class DeudasComponent implements OnInit {
  codigocliente: number;
  codigoEmpresa: number;
  listaDeudas: any[] = [];
  iddeudas: Array<string> = [];
  seleccionado: boolean = true;
  mensajeAlerta: string;
  form: FormGroup;
  importeTotal = 0;
  boton = false;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router, private deudaServ: DeudaService, private spinner: NgxSpinnerService) {
    this.codigoEmpresa = Number(this.encryptLocalstorage.getItem("codigoEmpresa"));
    this.codigocliente = Number(this.encryptLocalstorage.getItem("codigocliente"));

  }

  ngOnInit(): void {
    /* this.timer(); */
    this.listarDeudas();
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  listarDeudas() {
    this.deudaServ.deudas(this.codigocliente, this.codigoEmpresa)
      .subscribe((data: { deudas: any[] }) => {
        this.listaDeudas = data.deudas;
        this.encryptLocalstorage.setItem('cliente', {
          'email': this.listaDeudas[0].email,
          'id': this.listaDeudas[0].idCliente,
          'nombre': this.listaDeudas[0].nombre,
          'apellidos': this.listaDeudas[0].apellidos
        });
      }, (error) => {
        console.log("errorrespuestaDeuda", error.error.titulo);
      });
  }

  onCheckboxChange(evento) {
    if (evento.target.checked) {
      this.iddeudas.push(evento.target.defaultValue);
    }
    else {
      for (let index = 0; index < this.iddeudas.length; index++) {
        if (this.iddeudas[index] == evento.target.defaultValue) {
          this.iddeudas.splice(index, 1);
        }
      }
    }
    this.seleccionado = this.iddeudas.length != 0
  }

  enviar() {
    if (this.iddeudas.length === 0) {
      this.seleccionado = false;
      this.mensajeAlerta = "Debe seleccinar al menos una deuda.";
    }
    else {
      this.calcularMonto();
      this.encryptLocalstorage.setItem('deuda', this.iddeudas);
      this.encryptLocalstorage.setItem('deudaMonto', this.importeTotal);
      this.router.navigate(['pago', 'metodos-de-pago'])
    }
  }

  calcularMonto() {
    const deudas = [];
    for (let index = 0; index < this.listaDeudas.length; index++) {
      for (let index2 = 0; index2 < this.iddeudas.length; index2++) {
        if (this.listaDeudas[index].idDeuda == this.iddeudas[index2]) {
          deudas.push({
            idItem: this.listaDeudas[index].idDeuda,
            nombreItem: this.listaDeudas[index].conceptoVenta + ' ' + this.listaDeudas[index].codigoVenta,
            cantidadItem: 1,
            descripcionItem: this.listaDeudas[index].detalle,
            precioItem: this.listaDeudas[index].montoBs,
            monedaItem: this.listaDeudas[index].moneda,
            imagenItem: "",
            idSubcategoria: null,
            totalPagar: this.listaDeudas[index].montoBs,
          });
          this.importeTotal = this.importeTotal + this.listaDeudas[index].montoBs;
        }

      }

    }
    this.encryptLocalstorage.setItem('deudas', JSON.stringify(deudas))
  }

}
