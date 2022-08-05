import { BrowserModule } from '@angular/platform-browser';
import {NgxSecureCookieService} from 'ngx-secure-cookie';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { AgmCoreModule } from '@agm/core';
import { MDBBootstrapModule, MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { DeudasComponent } from './components/deudas/deudas.component';
import { MetodosDePagosComponent } from './components/metodos-de-pagos/metodos-de-pagos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { QrComponent } from './components/metodos-de-pagos/qr/qr.component';
import { TarjetaComponent } from './components/metodos-de-pagos/tarjeta/tarjeta.component';
import { EnviarQrComponent } from './components/metodos-de-pagos/qr/enviar-qr/enviar-qr.component';
import { AplicacionComponent } from './components/metodos-de-pagos/qr/aplicacion/aplicacion.component';
import { appRoutes } from './app.router';
import { PantallaDescansoComponent } from './components/pantalla-descanso/pantalla-descanso.component';
import { PantallaBienvenidaComponent } from './components/pantalla-bienvenida/pantalla-bienvenida.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { SubCategoriasComponent } from './components/sub-categorias/sub-categorias.component';
import { TecladoComponent } from './components/teclado/teclado.component';
import { FooterPtComponent } from './components/footerPt/footerPt.component';
import { FooterEmpresaComponent } from './components/footerEmpresa/footerEmpresa.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CabeceraEmpresaComponent } from './components/cabecera-empresa/cabecera-empresa.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImpresoraEjemploComponent } from './components/impresora-ejemplo/impresora-ejemplo.component'; // optional, provides moment-style pipes for date formatting
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeConfirmacionComponent } from './components/metodos-de-pagos/mensaje-confirmacion/mensaje-confirmacion';
import { Teclado2Component } from './components/teclado 2/teclado2.component';
import { FormcyberComponent } from './components/formcyber/formcyber.component';
import { FormsModule ,ReactiveFormsModule} from "@angular/forms";
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormPersonaComponent } from './components/form-persona/form-persona.component';
import { CajaComponent } from './components/caja/caja.component';
import { PosComponent } from './components/metodos-de-pagos/pos/pos.component';
import { ModalCodigoEmpresaComponent } from './components/modal-codigo-empresa/modal-codigo-empresa.component';
import { AppRoutingModule } from './app-routing.module';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent,
    // EmpresasComponent,
    // DeudasComponent,
    // MetodosDePagosComponent,
    // ClientesComponent,
    // QrComponent,
    // TarjetaComponent,
    // EnviarQrComponent,
    AplicacionComponent,
    // PantallaDescansoComponent,
    // PantallaBienvenidaComponent,
    // CategoriasComponent,
    // SubCategoriasComponent,
    TecladoComponent,
    // FooterPtComponent,
    // FooterEmpresaComponent,
    // CabeceraComponent,
    // CabeceraEmpresaComponent,
    ImpresoraEjemploComponent,
    // MensajeConfirmacionComponent,
    Teclado2Component,
    // FormcyberComponent,
    // ProductoComponent,
    // CarritoComponent,
    // ProductosComponent,
    // FormPersonaComponent,
    // CajaComponent,
    PosComponent,
    // ModalCodigoEmpresaComponent,
  ],
  imports: [
    // RouterModule.forRoot(appRoutes, {
    //   useHash: true,
    //   onSameUrlNavigation: "reload",
    // }),
    // NgxMaskModule.forRoot(),
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    MDBBootstrapModulesPro.forRoot(),
    MDBBootstrapModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    // MomentModule,
    // ModalModule,
    // NgxSpinnerModule,
    BrowserAnimationsModule,
    // AgmCoreModule.forRoot({ apiKey: 'Your_api_key' })
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [MDBSpinningPreloader,
    NgxSecureCookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
