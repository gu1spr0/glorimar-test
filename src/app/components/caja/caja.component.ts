import { Component, OnInit } from '@angular/core';
import { DeudaService } from 'src/app/servicios/deuda.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { TokeService } from 'src/app/servicios/token.service';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: []
})
export class CajaComponent implements OnInit {

  idrecibo;
  valor: string;
  codigoKiosko;
  bandera: boolean = false;
  listaPedido: any[] = [];
  detalleDeuda: any[] = [];
  d = new Date;
  token: string;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router,
    private deudaServ: DeudaService,
    private spinner: NgxSpinnerService,
    private cookie: NgxSecureCookieService,
    private tokenServ: TokeService,) {
    this.codigoKiosko = this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      this.valor = "CAJA" + ";" + this.codigoKiosko;
    this.bandera = this.encryptLocalstorage.getItem("banderMensajeCaja");
    /* this.adicionarDetalleProductos();
    this.obtenerToken(); */
  }

  ngOnInit(): void {
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 8000);
  }
  obtenerToken() {
    const data: any = {
      pass: "test",
      user: "test",
    };
    this.tokenServ.traerToken(data)
      .subscribe(
        (data) => {
          this.token = data.token;
          this.crearDeuda();
        }, (error) => {
          console.log("errorrespuestatoken", error.error.titulo);
        });
  }
  adicionarDetalleProductos() {
    this.listaPedido = this.encryptLocalstorage.getIte('listaPedido');
    for (var i in this.listaPedido) {
      this.detalleDeuda.push({
        cantidad: this.listaPedido[i].cantidadItem,
        ddata01: "string",
        ddata02: "string",
        ddata03: "string",
        descripcion_item: this.listaPedido[i].descripcionItem,
        item: this.listaPedido[i].nombreItem,
        precio_unitario: this.listaPedido[i].precioItem,
        sub_total: this.listaPedido[i].totalPagar,
      });
    }
  }
  crearDeuda() {
    const data: any = {
      apellido_materno: "S/N",
      apellido_paterno: "S/N",
      concepto_recibo: this.encryptLocalstorage.getItem("nombreEmpresa"),
      correo: "S/N",
      descripcion_general: this.encryptLocalstorage.getItem("nombreEmpresa"),
      detalle: this.detalleDeuda,
      domicilio: "S/N",
      idempresa: this.encryptLocalstorage.getItem("codigoEmpresa"),
      moneda: 1,
      monto: Number(this.encryptLocalstorage.getItem("carrito")["total"] || 0),
      nit: "S/N",
      nombres: "S/N",
      nro_recibo: this.d.getTime(),
      pdata01: "string",
      pdata02: "string",
      pdata03: "string",
      pdata04: "string",
      pdata05: "K.O.001",
      tipo_documento: 1,
      token: this.token,
      valor_documento: "S/D"
    };
    this.deudaServ.crearDeuda(data)
      .subscribe(
        (response) => {
          this.encryptLocalstorage.setItem('deuda', response.iddeuda.toString());
          this.getidRecibo();
        },
        (err) => {
          console.log(err);
        }
      );
  }
  getidRecibo() {
    let iddeuda = this.encryptLocalstorage.getItem("deuda");
    this.deudaServ.carrito(iddeuda)
      .subscribe((valor: any) => {
        this.idrecibo = valor[0].idrecibo.idrecibo;
        this.pagoCaja(this.idrecibo, this.valor);
      },
        (error) => {
          console.log(error)
        });
  }
  pagoCaja(idrecibo, valor) {
    this.deudaServ.actualizarDeuda(this.idrecibo, this.valor)
      .subscribe(
        (response) => {
          if (response.response) {
            this.bandera = true;
          }
        },
        (err) => {
          console.log(err);
          this.bandera = false;
        }
      );
  }

}
