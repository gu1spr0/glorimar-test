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

import { KioscoRoutingModule } from './kiosco-routing.module';
import { ControlesModule } from '../controles/controles.module';

import { PantallaDescansoComponent } from 'src/app/components/pantalla-descanso/pantalla-descanso.component';
import { PantallaBienvenidaComponent } from 'src/app/components/pantalla-bienvenida/pantalla-bienvenida.component';
import { EmpresasComponent } from 'src/app/components/empresas/empresas.component';
import { ModalCodigoEmpresaComponent } from 'src/app/components/modal-codigo-empresa/modal-codigo-empresa.component';


@NgModule({
  declarations: [
    PantallaDescansoComponent,
    PantallaBienvenidaComponent,
    EmpresasComponent,
    ModalCodigoEmpresaComponent,
  ],
  imports: [
    CommonModule,
    KioscoRoutingModule,
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
export class KioscoModule { }
