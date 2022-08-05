import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeudaService } from 'src/app/servicios/deuda.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokeService } from 'src/app/servicios/token.service';
import { ValidadoresService } from 'src/app/servicios/validadores.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { EncryptStorage } from 'encrypt-storage';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html',
  styleUrls: ['form-persona.css']
})
export class FormPersonaComponent implements OnInit {
  forma: FormGroup;
  codigoEmpresa: number;
  nombreEmpresa: string;
  persona: any;
  banderMensaje: boolean = false;
  listaPedido: any[] = [];
  detalleDeuda: any[] = [];
  token: string;
  d = new Date;
  idrecibo;
  valor: string;
  codigoKiosko;
  tipoOperacionKiosko: string;
  montoTotal: Number;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private personaServ: PersonaService,
    private tokenServ: TokeService,
    private deudaServ: DeudaService,
    private cookie: NgxSecureCookieService,) {
    this.crearFormulario();
    this.adicionarDetalleProductos();
    this.obtenerToken();
    this.codigoKiosko = this.cookie.get("codigoEmpresa", true, this.cookie.get("key", false)),
      this.valor = "CAJA" + ";" + this.codigoKiosko;
    this.codigoEmpresa = Number(this.encryptLocalstorage.getItem("codigoEmpresa"));
    this.nombreEmpresa = this.encryptLocalstorage.getItem("nombreEmpresa");
  }
  ngOnInit(): void {
  }
  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  crearFormulario() {
    this.forma = this.fb.group({
      idCi: ['', Validators.required],
      idNombre: ['', Validators.required],
      idAppPa: ['', Validators.required],
      idEmail: ['', Validators.required],
      idNit: ['', Validators.required],
      idDir: ['', Validators.required],
    });

  }
  get idCiNoValido() {
    return this.forma.get('idCi').invalid && this.forma.get('idCi').touched
  }
  get idNombreNoValido() {
    return this.forma.get('idNombre').invalid && this.forma.get('idNombre').touched
  }
  get idAppPaNoValido() {
    return this.forma.get('idAppPa').invalid && this.forma.get('idAppPa').touched
  }
  get idEmailNoValido() {
    return this.forma.get('idEmail').invalid && this.forma.get('idEmail').touched
  }
  get idNitNoValido() {
    return this.forma.get('idNit').invalid && this.forma.get('idNit').touched
  }
  get idDirNoValido() {
    return this.forma.get('idDir').invalid && this.forma.get('idDir').touched
  }
  datosPersona() {
    this.timer();
    this.personaServ.traerPersona(this.forma.get('idCi').value, Number(this.encryptLocalstorage.getItem("codigoEmpresa")))
      .subscribe(
        (data) => {
          if (data == null) {
            this.forma.patchValue({
              idNombre: "",
              idAppPa: "",
              idEmail: "",
              idNit: "",
              idDir: "",
            });
            this.persona = this.forma.value;
            this.banderMensaje = true;
          } else {
            this.persona = data;
            this.banderMensaje = false;
            this.forma.patchValue({
              idNombre: data.nombres,
              idAppPa: data.apellido_paterno,
              idEmail: data.correo,
              idNit: data.valor_documento,
              idDir: data.domicilio,
            });
          }
        }, (error) => {
          console.log("errorrespuestaDeuda", error.error.titulo);
          this.encryptLocalstorage.setItem('banderMensajeCaja', JSON.stringify(false));
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
    if (this.forma.valid) {
      this.crearDeuda();
    }
  }
  metodoPago() {
    var metodoPago = this.encryptLocalstorage.getItem("metodoPago");
    if (metodoPago == "tarjeta") {
      this.router.navigate(['pago', 'tarjeta']);
    }
    if (metodoPago == "caja") {
      this.getidRecibo();
    }
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
    this.deudaServ.actualizarDeuda(idrecibo, valor)
      .subscribe(
        (response) => {
          this.router.navigate(['pago', 'caja']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  cancelar() {
    this.router.navigate(['kiosco', 'empresas']);
    localStorage.clear();
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

        }, (error) => {
          console.log("errorrespuestatoken", error.error.titulo);
        });
  }
  adicionarDetalleProductos() {
    this.tipoOperacionKiosko = this.encryptLocalstorage.getItem("tipoOperacionKiosko");
    if (this.tipoOperacionKiosko == "COBRANZA") {
      this.listaPedido = this.encryptLocalstorage.getItem("deudas") || null;
      this.montoTotal = Number(this.encryptLocalstorage.getItem("deudaMonto") || 0);
    }
    if (this.tipoOperacionKiosko == "ECOMMERCE") {
      this.listaPedido = this.encryptLocalstorage.getItem("listaPedido") || null;
      this.montoTotal = Number(this.encryptLocalstorage.getItem("carrito")["total"] || 0);
    }

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
    this.timer();
    this.persona = this.forma.value;
    const data: any = {
      apellido_materno: "S/N",
      apellido_paterno: this.persona.idAppPa,
      concepto_recibo: "Recibo Empresa " + this.nombreEmpresa,
      correo: this.persona.idEmail,
      descripcion_general: this.nombreEmpresa,
      detalle: this.detalleDeuda,
      domicilio: this.persona.idDir,
      idempresa: this.encryptLocalstorage.getItem("codigoEmpresa"),
      moneda: 1,
      monto: this.montoTotal,
      nit: this.persona.idNit,
      nombres: this.persona.idNombre,
      nro_recibo: this.d.getTime(),
      pdata01: "string",
      pdata02: "string",
      pdata03: "string",
      pdata04: "string",
      pdata05: "K.O.001",
      tipo_documento: 1,
      token: this.token,
      valor_documento: this.persona.idCi
    };
    this.deudaServ.crearDeuda(data)
      .subscribe(
        (response) => {
          this.encryptLocalstorage.setItem('deuda', response.iddeuda.toString());
          this.encryptLocalstorage.setItem('banderMensajeCaja', JSON.stringify(true));
          this.encryptLocalstorage.setItem('cliente', {
            'email': this.persona.idEmail,
            'id': this.persona.idCi,
            'nombre': this.persona.idNombre,
            'apellidos': this.persona.idAppPa,
          });
          this.metodoPago();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
