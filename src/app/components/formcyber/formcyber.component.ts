import { MapTypeControlStyle } from '@agm/core/services/google-maps-types';
import { Component, Directive, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { MdbCreditCardDirective } from 'ng-uikit-pro-standard';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AtcMerchantDataRubroEmpresas } from 'src/app/models/AtcMerchantDataRubroEmpresas';
// import { AtcMerchantDataRubroEmpresas } from 'src/app/models/atcMerchantDataRubroEmpresas';
import { AtcProfileEmpresa } from 'src/app/models/AtcProfileEmpresa';
import { Bnb } from 'src/app/models/bnb';
import { Deuda } from 'src/app/models/deuda.model';
import { BnbService } from 'src/app/servicios/bnb.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { DeudaService } from 'src/app/servicios/deuda.service';
import { EmpresaService } from 'src/app/servicios/empresa.service';
import { EmpresacanalpagoService } from 'src/app/servicios/empresacanalpago.service';
import { ParametricaService } from 'src/app/servicios/parametrica.service';
import { ReciboService } from 'src/app/servicios/recibo.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-formcyber',
  templateUrl: './formcyber.component.html',
  styleUrls: ['formcyber.css']
})
export class FormcyberComponent {
  input1: string;
  input2: string;
  bandera1: Boolean = false;
  opcion: Boolean = false;
  ftmesText: string = '';
  ftanoText: string = '';
  tipo1: string;
  tipo2: string;
  base64: string;
  forma: FormGroup;
  encryptLocalstorage = EncryptStorage('Secret_key');
  URL = environment.URLcyber;
  persona: FormGroup;
  d = new Date();
  nombre: string;
  codepostal: string = '94043';
  apellido: string;
  direccion: string = '1295 Charleston Road';
  correo: string;
  pais: string = 'US';
  ciudad: string = 'Mountain View';
  estado: string = 'CA';
  total: number = 0;
  cont: number;
  moneda: string;
  currency: string = 'BOB';
  amount: string;
  dias: number;
  idempresa: number;
  documento: string;
  deuda: Deuda[];
  fechavenc: string;
  today: string;
  myParam: string;
  complementoStates: boolean = false;
  profile_id: string;
  access_key: string;
  // profile_id = '4DBC22A3-1D3E-4CA1-A3EC-3186DA198969';
  // access_key = '2ba5149dbd563d64b5b875a3fd4407d2';
  bill_to_phone: string = '02890888888';
  signed_field_names =
    // "access_key,profile_id,transaction_uuid,locale,signed_field_names,signed_date_time,transaction_type,reference_number,amount,currency,unsigned_field_names,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_address_line1,bill_to_address_city,bill_to_address_country,bill_to_address_state,bill_to_phone,bill_to_address_postal_code";
    "access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code";
  locale = "es-us";
  transaction_type = "sale";
  reference_number: any;
  signed_date_time: any;
  device_fingerprint_id: any;
  unsigned_field_names: Array<string> = []; //= "merchant_defined_data1,merchant_defined_data3,merchant_defined_data4,merchant_defined_data6,merchant_defined_data11,merchant_defined_data16,merchant_defined_data17,merchant_defined_data18,merchant_defined_data87,merchant_defined_data90,merchant_defined_data91";
  transaction_uuid: any;
  signature: string;
  secret_key: string;
  payment_method: string = 'card';
  card_type = '001';//MASTERCARD
  card_number: string /* = '5454545454545454' */;//MASTERCARD
  // card_type = '001';//VISA
  // card_number: string = '4111111111111111';//VISA
  card_expiry_date /* = '03-2022'.trim() */;
  card_cvn /* = '123' */;
  meses: Array<any>;
  years: Array<any>;
  paises;
  ciudades: Array<any>;
  cvctipotexto: boolean;

  constructor(
    private bnbS: BnbService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private servicio: DeudaService,
    private reciboS: ReciboService,
    private empresaS: EmpresaService,
    private clienteS: ClienteService,
    private route: ActivatedRoute,
    private empcanpagoServ: EmpresacanalpagoService,
    private parametricaS: ParametricaService) {
    this.persona = new FormGroup({
      'datos': new FormGroup({
        'nombres': new FormControl(null, [Validators.required]),
        'apellidos': new FormControl(null, [Validators.required]),
      }),
      'datos2': new FormGroup({
        'direccion': new FormControl(null, [Validators.required]),
        'codepostal': new FormControl(null, [Validators.required]),
      }),
      'correo': new FormControl(null, [Validators.required]),
      'datos3': new FormGroup({
        'pais': new FormControl(null, [Validators.required]),
        'ciudad': new FormControl(null, [Validators.required]),
        'estado': new FormControl(null, [Validators.required]),
      }),
      'tipo': new FormControl(null, [Validators.required]),
      'numero': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{16}$')]),
      'mm': new FormControl(null, [Validators.required]),
      // 'aaaa': new FormControl(null, [Validators.required]),
      'cvn': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{3}$')]),
    });
    this.transaction_uuid = this.UUID();
    this.signed_date_time = this.date_time();
    this.route.params.subscribe((params: Params) => this.myParam = params['link']);
    this.consulta(this.myParam);
  }
  getPersonaFormControl(name) {
    return this.persona.get(name);
  }
  ngOnInit() {
    /* this.timer(); */
    this.initmeses()
    this.inityears()
  }
  initmeses() {
    this.meses = [
      { value: '01', label: 'Enero' },
      { value: '02', label: 'Febrero' },
      { value: '03', label: 'Marzo' },
      { value: '04', label: 'Abril' },
      { value: '05', label: 'Mayo' },
      { value: '06', label: 'Junio' },
      { value: '07', label: 'Julio' },
      { value: '08', label: 'Agosto' },
      { value: '09', label: 'Septiembre' },
      { value: '10', label: 'Octubre' },
      { value: '11', label: 'Noviembre' },
      { value: '12', label: 'Diciembre' },
    ]
  }
  inityears() {
    this.years = [
      { value: '2020', label: '2020' },
      { value: '2021', label: '2021' },
      { value: '2022', label: '2022' },
      { value: '2023', label: '2023' },
      { value: '2024', label: '2024' },
      { value: '2025', label: '2025' },
    ]
  }
  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  consulta(link) {
    this.empcanpagoServ.getIPAddress().subscribe(
      (res: any) => {
        this.parametrica(res.country_name, res.city, res.country);
        let iddeuda = String(this.encryptLocalstorage.getItem("deuda"));
        this.servicio.carrito(iddeuda)
          .subscribe((valor: any) => {
            this.correo = valor[0].idrecibo.glosa2;
            this.cont = 1;
            this.moneda = "BOB";
            this.amount = Number(this.encryptLocalstorage.getItem("deudaMonto")).toFixed(2);
            this.idempresa = Number(this.encryptLocalstorage.getItem("codigoEmpresa"));
            this.documento = valor[0].idcliente.codigo_cliente;
            this.nombre = valor[0].idcliente.idpersona.nombres;
            this.apellido = valor[0].idcliente.idpersona.apellido_paterno;
            this.bill_to_phone = '';
            this.access_key = valor[0].idcliente.idempresa.atcProfileEmpresa.accessKey;
            this.profile_id = valor[0].idcliente.idempresa.atcProfileEmpresa.profileId;
          },
            (error) => {
              console.log(error)
            });
      }
    )
  }
  parametrica(pais, ciudad, estado) {
    this.parametricaS.obtener2(pais, ciudad, estado).subscribe(data => {
      if (data) {
        // this.pais = data[0].codigo;
        // this.estado = data[0].valor;
        // this.ciudad = data[0].glosa;
        this.persona.get('datos3')
        this.persona.patchValue({
          'datos3': {
            'pais': this.pais,
            'ciudad': this.ciudad,
            'estado': this.estado
          }
        })
      }
      else {
        this.paises = data.descripcion;
      }
    },
      error => {
        console.log(error);
      })
  }
  pagoCyber() {
    /* this.timer(); */
    // this.card_cvn = this.persona.value.cvn
    // this.card_expiry_date = this.card_expiry_date //this.persona.value.mm + '-' + this.persona.value.aaaa;
    // this.card_number = this.persona.value.numero
    // this.nombre = this.persona.value.datos.nombres
    // this.apellido = this.persona.value.datos.apellidos
    // this.direccion = this.persona.value.datos2.direccion
    // this.codepostal = this.persona.value.datos2.codepostal
    // this.correo = this.persona.value.correo
    // this.pais = this.persona.value.datos3.pais
    // this.ciudad = this.persona.value.datos3.ciudad
    // this.estado = this.persona.value.datos3.estado
    this.card_cvn = this.input2;
    this.card_number = this.input1;
    this.card_expiry_date = this.ftmesText + "-" + this.ftanoText;

    this.persona.patchValue({
      'datos': {
        'nombres': this.nombre,
        'apellidos': this.apellido,
      },
      'datos2': {
        'direccion': this.direccion,
        'codepostal': this.codepostal
      },
      'correo': this.correo,
      'tipo': this.card_type,
      'mm': this.ftmesText + "-" + this.ftanoText,
      // 'aaaa': '2023',
      'numero': this.input1,
      'cvn': this.input2,
    })
    this.unsigned_field_names.push(
      'card_type,card_number,card_expiry_date,card_cvn,device_fingerprint_id'
    )
    this.empresaS.obtener(Number(this.encryptLocalstorage.getItem("codigoEmpresa")))
      .subscribe(response => {
        this.reference_number = this.d.getTime() + "-1";
        // this.profile_id = response.atcProfileEmpresa.profileId;
        // this.access_key = response.atcProfileEmpresa.accessKey;
        // this.secret_key = response.atcProfileEmpresa.secretKey;

        // DATEC
        this.secret_key = response.atcProfileEmpresa.secretKey;
        // PAGATODO
        // this.secret_key = 'f94b1357b0db4048b7d2ab6112d2de2b4c1a7fff3ac44794a8916ff152925bf9632402de05b14c8db33522aea028df6081b7a57be5d74394bef84786c6a6ca42048ded098cf44661baf8258642e58ba36487538020734e2cb5c35e8abf1b40c5d32616a0ca084f82bffec8bbd05d7f1859c1a3d25c094549b909994fa0ef2291';

        this.createform(response.atcMerchantDataRubroEmpresas, response.atcProfileEmpresa)
      });
  }


  createform(merchantdata: AtcMerchantDataRubroEmpresas[], profile: AtcProfileEmpresa) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("id", "boton_pago");
    form.setAttribute(
      "action", this.URL
    );
    var container = document.getElementById("container");
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    }
    for (let i = 0; i < merchantdata.length; i++) {
      if (merchantdata[i].atcMerchantDataRubro.tipo == "DESEABLE") {
        switch (merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre) {
          case "merchant_defined_data1": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data2": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data3": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, 0));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data4": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data5": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data6": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data9": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data11": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, this.documento));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data14": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data16": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data17": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data18": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data24": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, this.cont));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data87": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data90": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          case "merchant_defined_data91": {
            form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, this.amount));
            this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
          }
          default:
            {
              form.appendChild(this.input(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre, merchantdata[i].valor));
              this.unsigned_field_names.push(merchantdata[i].atcMerchantDataRubro.atcMerchantData.nombre); break;
            }
        }
      }
    }
    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
    this.unsigned_field_names = this.unsigned_field_names.sort(sortAlphaNum)
    const httpOptions = {
      params: {
        access_key: this.access_key,
        profile_id: this.profile_id,
        amount: this.amount,
        currency: this.currency,
        signed_field_names: this.signed_field_names,
        transaction_type: this.transaction_type,
        reference_number: this.reference_number,
        locale: this.locale,
        unsigned_field_names: this.unsigned_field_names.toString(),
        signed_date_time: this.signed_date_time,
        transaction_uuid: this.transaction_uuid,
        secret_key: this.secret_key,
        bill_to_address_state: this.estado,
        bill_to_address_line1: this.direccion,
        bill_to_email: this.correo,
        bill_to_address_city: this.ciudad,
        bill_to_address_country: this.pais,
        bill_to_forename: this.nombre,
        bill_to_surname: this.apellido,
        payment_method: this.payment_method,
        bill_to_address_postal_code: this.codepostal,
        bill_to_phone: this.bill_to_phone,
        submit: 'submit',
        card_type: this.card_type,
        card_number: this.card_number,
        card_expiry_date: this.card_expiry_date,
        card_cvn: this.card_cvn
      }
    };
    form.appendChild(this.input("amount", this.amount));
    form.appendChild(this.input("profile_id", this.profile_id));
    form.appendChild(this.input("access_key", this.access_key));
    form.appendChild(this.input("currency", this.currency));
    form.appendChild(this.input("signed_field_names", this.signed_field_names));
    form.appendChild(this.input("locale", this.locale));
    form.appendChild(this.input("transaction_type", this.transaction_type));
    form.appendChild(this.input("reference_number", this.reference_number));
    form.appendChild(this.input("signed_date_time", this.signed_date_time));
    form.appendChild(this.input("transaction_uuid", this.transaction_uuid));
    form.appendChild(this.input("device_fingerprint_id", this.transaction_uuid));
    form.appendChild(this.input("bill_to_address_state", this.estado));
    form.appendChild(this.input("bill_to_address_line1", this.direccion));
    form.appendChild(this.input("bill_to_email", this.correo));
    // form.appendChild(this.input("submit", 'submit'));
    form.appendChild(this.input("bill_to_address_city", this.ciudad));
    form.appendChild(this.input("bill_to_address_country", this.pais));
    form.appendChild(this.input("bill_to_forename", this.nombre));
    form.appendChild(this.input("bill_to_surname", this.apellido));
    form.appendChild(this.input("bill_to_address_postal_code", this.codepostal));
    form.appendChild(this.input("bill_to_phone", this.bill_to_phone));
    form.appendChild(this.input("payment_method", this.payment_method));
    form.appendChild(this.input("unsigned_field_names", this.unsigned_field_names.toString()));
    form.appendChild(this.input("card_type", this.card_type));
    form.appendChild(this.input("card_number", this.card_number));
    form.appendChild(this.input("card_expiry_date", this.card_expiry_date));
    form.appendChild(this.input("card_cvn", this.card_cvn));
    this.Sinature(httpOptions, form, profile);
  }
  input(name, value): HTMLInputElement {
    var type = document.createElement("input");
    type.id = name
    type.name = name
    type.type = "hidden";
    type.value = value
    return type;
  }
  Sinature(httpOptions, form, profile) {
    this.reciboS.signature(httpOptions).subscribe(
      (response2) => {
        this.signature = response2[0];
        let iddeuda = this.encryptLocalstorage.getItem("deuda");
        this.clienteS
          .reference(iddeuda, this.reference_number)
          .subscribe(
            (response) => {
              form.appendChild(this.input("signature", this.signature));
              document.getElementById("container").appendChild(form);
              const scriptEl = document.createElement("script");
              scriptEl.setAttribute(
                "src",
                //   // "https://h.online-metrix.net/fp/tags.js?org_id=" + profile.orgId + "&session_id=" + profile.sessionId + this.transaction_uuid
                //   // CON FLASH
                "https://h.online-metrix.net/fp/tags.js?org_id=" + profile.orgId + "&session_id=" + profile.sessionId + this.transaction_uuid
                // SIN FLASH
                // "https://h.online-metrix.net/fp/tags.js?org_id=45ssiuz3&session_id=" + profile.sessionId + this.transaction_uuid
              );
              const body = document.getElementsByTagName("head")[0];
              document.getElementById("boton_pago").appendChild(scriptEl);
              document.body.appendChild(form);
              form.submit();
              this.spinner.show();
              setTimeout(() => {
                this.spinner.hide();
              }, 2000);
            },
            (err) => {
              console.log(err);
            }
          );

      },
      (err) => {
        console.log(err);
      }
    );
  }
  UUID() {
    this.reciboS.UUID().subscribe(
      (response) => {
        this.transaction_uuid = response[0];
      })
  }
  date_time() {
    this.reciboS.date().subscribe(
      (response1) => {
        this.signed_date_time = response1[0];
      })
  }
  cargarciudad(e) {
    this.parametricaS.obtenerciudades(e).subscribe(data => {
      this.ciudades = data;
    },
      error => {
        console.log(error);
      })
  }
  states(e) {
    this.persona.patchValue({
      'datos3': {
        'estado': e
      }
    })
  }

  mostrartextocvc() {
    this.cvctipotexto = !this.cvctipotexto;
  }

}

