import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeudaService } from 'src/app/servicios/deuda.service';
import { PosService } from 'src/app/servicios/pos.service';
import { ReciboService } from 'src/app/servicios/recibo.service';
import { NgxSecureCookieService } from 'ngx-secure-cookie';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: []
})
export class PosComponent implements OnInit {
  valor = 1;
  ippos = "172.21.16.111";
  total;
  deudaMonto;
  iddeuda;
  reference_number;
  d = new Date();
  idrecibo;
  nro_recibo;
  estado_recibo;
  empresaId;
  mensajePOS: string;
  codigoKiosko;
  tipoOperacionKiosko;
  detalleDeuda: any[] = [];
  itemsLista: any[] = [];

  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private cookie: NgxSecureCookieService,
    private posService: PosService,
    private reciboServ: ReciboService,
    private deudaServ: DeudaService,) {
    this.deudaMonto = Number(localStorage.getItem("deudaMonto")).toFixed(2);
    this.codigoKiosko = this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      this.iddeuda = localStorage.getItem("deuda");
    this.itemsLista = JSON.parse(localStorage["listaPedido"]);
    this.tipoOperacionKiosko = localStorage.getItem("tipoOperacionKiosko");
    this.empresaId = localStorage.getItem("codigoEmpresa");
    this.reference_number = this.d.getTime() + "-1";
    this.getIpPOS();
    this.getidRecibo();
    this.pagarChip();
  }

  ngOnInit(): void {
  }

  getidRecibo() {
    if (this.tipoOperacionKiosko != "ECOMMERCE") {
      this.deudaServ.carrito(this.iddeuda)
        .subscribe((valor: any) => {
          this.idrecibo = valor[0].idrecibo.idrecibo;
          this.nro_recibo = valor[0].idrecibo.nro_recibo;
          this.estado_recibo = valor[0].idrecibo.estado;
        },
          (error) => {
            console.log(error)
          });
    }
  }
  adicionarDetalleProductos() {
    for (var i in this.itemsLista) {
      this.detalleDeuda.push({
        cantidad: this.itemsLista[i].cantidadItem,
        estado: "PAG",
        descripcion_item: this.itemsLista[i].descripcionItem,
        item: this.itemsLista[i].nombreItem,
        precio_unitario: this.itemsLista[i].precioItem,
        sub_total: this.itemsLista[i].totalPagar,
      });
    }
  }
  pagarDeuda() {
    if (this.tipoOperacionKiosko == "ECOMMERCE") {
      this.adicionarDetalleProductos();
      const data = {
        nro_recibo: this.reference_number.split("-")[0],
        monto: this.total,
        estado: "PAG",
        concepto_recibo: "Servicio varios " + localStorage.getItem("nombreEmpresa"),
        descripcion_general: "Servicio varios " + localStorage.getItem("nombreEmpresa"),
        moneda: 1,
        reference_number: this.reference_number,
        iddeuda: {
          estado: "PAG",
          idcliente: {
            codigo_cliente: "0"
          },
          idpago: {}
        },
        iddetalle: this.detalleDeuda,
      };

      this.reciboServ.pagarDeudasCajaKiosko(data, String(localStorage.getItem("codigoEmpresa")))
        .subscribe(
          (response) => {

          },
          (err) => {
            console.log("entro en el error", err);
          }
        );
    }
    else {
      const data = {
        idrecibo: this.idrecibo,
        nro_recibo: this.nro_recibo,
        estado: "PAG",
        reference_number: this.reference_number,
        iddeuda: {
          estado: "PAG"
        }
      }
      this.reciboServ.pagarDeudaPOS(data, String(this.empresaId))
        .subscribe(
          (response) => {
          },
          (err) => {
          }
        );
    }
  }
  pagarChip() {
    this.total = Number(localStorage.getItem("deudaMonto")).toFixed(2);
    this.posService.pagarChip(this.ippos, this.total)
      .subscribe(
        (response) => {
          this.respuestaPos(response);
        },
        (err) => {
          console.log(err);
          this.valor = 4;
        }
      );
  }
  getIpPOS() {
    this.posService.getIpPosAtc(this.codigoKiosko)
      .subscribe(
        (response) => {
        },
        (err) => {
          console.log(err);
          this.valor = 5;
        }
      );
  }
  respuestaPos(response) {
    if (response.codRespuesta == "00" && response.codAutoriz != null) {
      this.valor = 2;
      this.pagarDeuda();
    }
    else {
      if (response.codRespuesta == "51") {
        this.valor = 3;
      } else {
        this.valor = 4;
      }
    }
  }
  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  imprimirRecibo() {
    this.reciboServ.listarecibo(this.reference_number)
      .subscribe(
        (response) => {
          this.volverPantallaInicio();
        },
        (err) => {
          console.log("entro en el error impresora", err);
          this.valor = 4;
        }
      );
  }

  volverPantallaInicio() {
    this.router.navigate(['pantalla-descanso']);
  }

}
