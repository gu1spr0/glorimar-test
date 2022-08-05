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

import { CatalogoRoutingModule } from './catalogo-routing.module';

import { CategoriasComponent } from 'src/app/components/categorias/categorias.component';
import { SubCategoriasComponent } from 'src/app/components/sub-categorias/sub-categorias.component';
import { ProductosComponent } from 'src/app/components/productos/productos.component';
import { ProductoComponent } from 'src/app/components/producto/producto.component';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { ControlesModule } from '../controles/controles.module';


@NgModule({
  declarations: [
    CategoriasComponent,
    SubCategoriasComponent,
    ProductosComponent,
    ProductoComponent,
    CarritoComponent,
  ],
  imports: [
    CommonModule,
    CatalogoRoutingModule,
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
export class CatalogoModule { }
