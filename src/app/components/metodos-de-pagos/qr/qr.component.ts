import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bnb } from 'src/app/models/bnb';
import { BnbService } from 'src/app/servicios/bnb.service';
import { DatePipe } from '@angular/common';
import { DeudaService } from 'src/app/servicios/deuda.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { TokeService } from 'src/app/servicios/token.service';
import { WebsocketService } from 'src/app/servicios/websocket.service';
import { ParametricaService } from 'src/app/servicios/parametrica.service';
import { Parametrica } from '../../../models/parametrica.model';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['qr.css'],
  providers: [DatePipe]
})
export class QrComponent implements OnInit {

  words: string[];
  base64: string;
  empresa;
  total;
  idQr;
  idempresa: number;
  amount: number;
  reference_number;
  idrecibo;
  d = new Date();
  fechavenc;

  forma: FormGroup;
  banderaEstadoEnvioCorreo: boolean = false;
  idCliente;
  idEmpresa;
  nombreCliente;
  emailCliente;
  EstadoQr = 1;
  contador: number = 0;
  valor: string;
  codigoKiosko;
  token: string;
  listaPedido: any[] = [];
  detalleDeuda: any[] = [];
  data: any;
  tipoOperacionKiosko: string;
  encryptLocalstorage = EncryptStorage('Secret_key');
  cuentaRegresiva: number;

  @ViewChild('modalCorreo', { static: false }) modalCorreo: ModalDirective;

  constructor(
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private bnbS: BnbService,
    private servicio: DeudaService,
    private router: Router,
    private cookie: NgxSecureCookieService,
    private tokenServ: TokeService,
    private socket: WebsocketService,
    private parametricaS: ParametricaService,
  ) {
    this.tipoOperacionKiosko = this.encryptLocalstorage.getItem("tipoOperacionKiosko");
    this.idEmpresa = Number(this.encryptLocalstorage.getItem("codigoEmpresa"));
    this.codigoKiosko = this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      this.valor = "CAJA" + ";" + this.codigoKiosko;
    if (this.tipoOperacionKiosko == 'ECOMMERCE') {
      this.adicionarDetalleProductos();
    }
    this.parametricaToken();
    let stompClient = this.socket.connect();
    stompClient.connect({}, frame => {
      stompClient.subscribe('/socket/recibo', notifications => {
        this.showGreeting(notifications.body);
      })
    });
  }

  ngOnInit(): void {
    this.initemailCliente()
  }

  initemailCliente() {
    if (this.tipoOperacionKiosko == 'COBRANZA') {
      this.emailCliente = this.encryptLocalstorage.getItem("cliente")["email"];
    }
  }

  showGreeting(message) {
    console.log(message);
    if (message === 'null') {
      this.socket._disconnect();
      setTimeout(() => { location.reload() }, 500);
    }
    if (this.data[0] === message.split(',')[0]) {
      this.socket._disconnect();
      this.EstadoQr = 2;
    }
  }
  Message(message: any) {
    console.log(message);
    // this.greeting = message;
  }
  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  getidRecibo() {
    let iddeuda = this.encryptLocalstorage.getItem("deuda");
    this.servicio.carrito(iddeuda)
      .subscribe((valor: any) => {
        this.idrecibo = valor[0].idrecibo.idrecibo;
        this.empresa = valor[0].idcliente.idempresa.razon_social;
        this.fechavenc = valor[0].idrecibo.fecha_vencimiento;
        this.pagoQR();
      },
        (error) => {
          console.log(error)
        });
  }
  pagoQR() {
    this.reference_number = this.d.getTime() + "-1";
    const data: Bnb = {
      banco: "BNB",
      fechaExpiracion: this.datePipe.transform(this.fechavenc, 'yyyy-MM-dd'),
      glosa: this.empresa,
      moneda: 'BOB',
      monto: Number(this.encryptLocalstorage.getItem("deudaMonto")),
      recibos: String(this.idrecibo),
      referenceNumber: this.reference_number,
      usoUnico: true,
      idEmpresa: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
      aliasQr: Number(this.encryptLocalstorage.getItem("codigoEmpresa"))
    };
    this.bnbS.imagen(data)
      .subscribe(
        (response) => {
          this.base64 = "data:image/png;base64," + response.qr;
          this.encryptLocalstorage.setItem('idQr', response.mensaje);
          this.socket._send(this.reference_number, this.idrecibo)
        },
        (err) => {
          console.log(err);
        }
      );
  }

  consultarEstadoPago() {
    this.idQr = Number(this.encryptLocalstorage.getItem("idQr"));
    const data: any = {
      aliasQr: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
      banco: "BNB",
      idEmpresa: Number(this.encryptLocalstorage.getItem("codigoEmpresa")),
      idQr: this.idQr,
      referenceNumber: this.reference_number,
    };
    this.bnbS.consultarQr(data)
      .subscribe(
        (response) => {
          this.EstadoQr = 2;

        },
        (err) => {
          console.log(err);
          this.EstadoQr = 1;

        }
      );
  }
  enviarApp() {
    this.consultarEstadoPago();
    this.router.navigate(['pago', 'mensaje-confirmacion'])
  }
  enviarCorreoModal() {
    this.modalCorreo.show();
  }
  enviarQr() {
    this.spinner.show();
    const data: any = {
      email: this.emailCliente,
      idEmpresa: this.idEmpresa,
      idcliente: "0",
      nombreCliente: "S/N",
      referenceNumber: this.reference_number,
    };
    this.bnbS.enviarQrEmail(data)
      .subscribe(
        (response) => {
          setTimeout(() => {
            this.spinner.hide();
            this.banderaEstadoEnvioCorreo = true;
            this.empezarCuentaRegresiva(5)
          }, 2000);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  empezarCuentaRegresiva(segundos) {
    this.cuentaRegresiva = segundos
    const interval = setInterval(() => {
      if (this.cuentaRegresiva > 0) {
        this.cuentaRegresiva--;
      } else {
        clearInterval(interval)
        this.router.navigate(['kiosco', 'empresas']);
      }
    }, 1000)
  }
  parametricaToken() {
    this.parametricaS.obtener2('token', 'TOKEN', this.idEmpresa).subscribe(
      (data: any) => {
        this.token = data.parametrica[0].valor;
        this.crearDeuda();
      }, (error) => {
        console.log("errorrespuestatoken");
      });
  }
  adicionarDetalleProductos() {
    this.listaPedido = this.encryptLocalstorage.getItem("listaPedido");
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
    if (this.tipoOperacionKiosko == 'COBRANZA') {
      this.getidRecibo();
    }
    if (this.tipoOperacionKiosko == 'ECOMMERCE') {
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
        nit: 0,
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
      this.servicio.crearDeuda(data)
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
  }
}
