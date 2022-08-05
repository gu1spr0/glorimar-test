import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSecureCookieService } from 'ngx-secure-cookie';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { CabeceraComponent } from 'src/app/components/cabecera/cabecera.component';
import { CabeceraEmpresaComponent } from 'src/app/components/cabecera-empresa/cabecera-empresa.component';
import { FooterPtComponent } from 'src/app/components/footerPt/footerPt.component';
import { FooterEmpresaComponent } from 'src/app/components/footerEmpresa/footerEmpresa.component';



@NgModule({
  declarations: [
    CabeceraComponent,
    CabeceraEmpresaComponent,
    FooterPtComponent,
    FooterEmpresaComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CabeceraComponent,
    CabeceraEmpresaComponent,
    FooterPtComponent,
    FooterEmpresaComponent,
  ]
})
export class ControlesModule { }
