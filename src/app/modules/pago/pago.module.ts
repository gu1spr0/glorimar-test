import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { MDBBootstrapModule, MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSecureCookieService } from 'ngx-secure-cookie';

import { PagoRoutingModule } from './pago-routing.module';

import { CajaComponent } from 'src/app/components/caja/caja.component';
import { FormPersonaComponent } from 'src/app/components/form-persona/form-persona.component';
import { MensajeConfirmacionComponent } from 'src/app/components/metodos-de-pagos/mensaje-confirmacion/mensaje-confirmacion';
import { MetodosDePagosComponent } from 'src/app/components/metodos-de-pagos/metodos-de-pagos.component';
import { EnviarQrComponent } from 'src/app/components/metodos-de-pagos/qr/enviar-qr/enviar-qr.component';
import { QrComponent } from 'src/app/components/metodos-de-pagos/qr/qr.component';
import { TarjetaComponent } from 'src/app/components/metodos-de-pagos/tarjeta/tarjeta.component';
import { FormcyberComponent } from 'src/app/components/formcyber/formcyber.component';
import { ControlesModule } from '../controles/controles.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MetodosDePagosComponent,
    QrComponent,
    EnviarQrComponent,
    FormPersonaComponent,
    FormcyberComponent,
    CajaComponent,
    TarjetaComponent,
    MensajeConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    PagoRoutingModule,
    ControlesModule,
    
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MDBBootstrapModulesPro.forRoot(),
    MDBBootstrapModule.forRoot(),
    MomentModule,
    ModalModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    MDBSpinningPreloader,
    NgxSecureCookieService,
  ],
})
export class PagoModule { }
