import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { MDBBootstrapModule, MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSecureCookieService } from 'ngx-secure-cookie';

import { PersonaRoutingModule } from './persona-routing.module';

import { ClientesComponent } from 'src/app/components/clientes/clientes.component';
import { DeudasComponent } from 'src/app/components/deudas/deudas.component';
import { ControlesModule } from '../controles/controles.module';


@NgModule({
  declarations: [
    ClientesComponent,
    DeudasComponent,
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
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
export class PersonaModule { }
