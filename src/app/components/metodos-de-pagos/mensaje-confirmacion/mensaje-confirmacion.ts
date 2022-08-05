import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptStorage } from 'encrypt-storage';
import { NgxSpinnerService } from 'ngx-spinner';
import { BnbService } from 'src/app/servicios/bnb.service';



@Component({
  selector: 'app-mensaje-confirmacion',
  templateUrl: './mensaje-confirmacion.html',
  styleUrls: []
})
export class MensajeConfirmacionComponent implements OnInit {

  idQr: number;
  estadoConsultaQr: number;
  timeLeft: number = 7;
  interval;
  reference_number;
  EstadoQr;
  encryptLocalstorage = EncryptStorage('Secret_key');

  constructor(private router: Router, private bnbS: BnbService, private spinner: NgxSpinnerService,) {
    this.estadoConsultaQr = Number(this.encryptLocalstorage.getItem("estadoConsultaQr"));
    this.idQr = Number(this.encryptLocalstorage.getItem("idQr"));
    this.consultarCodigoQr();
    this.startTimer();
  }

  startTimer() {
    if (this.estadoConsultaQr == 2) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.pauseTimer();
          this.router.navigate(['kiosco', 'pantalla-descanso']);
        }
      }, 1000)
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  consultarCodigoQr() {
    this.timer();
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
          this.encryptLocalstorage.setItem('estadoConsultaQr', this.EstadoQr);
        },
        (err) => {
          console.log(err);
          this.EstadoQr = 1;
          this.encryptLocalstorage.setItem('estadoConsultaQr', this.EstadoQr);
        }
      );
  }

  enviarNuevoQr() {
    this.router.navigate(['pago', 'qr'])
  }

  ngOnInit(): void {
    this.timer();
  }

  timer() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

}
