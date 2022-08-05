import { Routes } from "@angular/router";
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DeudasComponent } from './components/deudas/deudas.component';
import { MetodosDePagosComponent } from './components/metodos-de-pagos/metodos-de-pagos.component';
import { QrComponent } from './components/metodos-de-pagos/qr/qr.component';
import { TarjetaComponent } from './components/metodos-de-pagos/tarjeta/tarjeta.component';
import { AplicacionComponent } from './components/metodos-de-pagos/qr/aplicacion/aplicacion.component';
import { EnviarQrComponent } from './components/metodos-de-pagos/qr/enviar-qr/enviar-qr.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { SubCategoriasComponent } from './components/sub-categorias/sub-categorias.component';
import { PantallaBienvenidaComponent } from './components/pantalla-bienvenida/pantalla-bienvenida.component';
import { PantallaDescansoComponent } from './components/pantalla-descanso/pantalla-descanso.component';
import { FooterEmpresaComponent } from './components/footerEmpresa/footerEmpresa.component';
import { FooterPtComponent } from './components/footerPt/footerPt.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { ImpresoraEjemploComponent } from './components/impresora-ejemplo/impresora-ejemplo.component';
import { MensajeConfirmacionComponent } from './components/metodos-de-pagos/mensaje-confirmacion/mensaje-confirmacion';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FormPersonaComponent } from "./components/form-persona/form-persona.component";
import { CajaComponent } from "./components/caja/caja.component";
import { PosComponent } from "./components/metodos-de-pagos/pos/pos.component";


export const appRoutes: Routes = [
    { path: "", redirectTo: "/pantalla-descanso", pathMatch: "full" },
    { path: 'empresas', component: EmpresasComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'deudas', component: DeudasComponent },
    { path: 'metodos-de-pago', component: MetodosDePagosComponent },
    { path: 'qr', component: QrComponent },
    { path: 'tarjeta', component: TarjetaComponent },
    { path: 'aplicacion', component: AplicacionComponent },
    { path: 'enviar-qr', component: EnviarQrComponent },
    { path: 'pantalla-descanso', component: PantallaDescansoComponent },
    { path: 'pantalla-bienvenida', component: PantallaBienvenidaComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'sub-categorias', component: SubCategoriasComponent },
    { path: 'footerEmpresa', component: FooterEmpresaComponent },
    { path: 'footerPt', component: FooterPtComponent },
    { path: 'cabecera', component: CabeceraComponent },
    { path: 'impresora', component: ImpresoraEjemploComponent },
    { path: 'mensaje-confirmacion', component: MensajeConfirmacionComponent },
    { path: 'producto', component: ProductoComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'carrito', component: CarritoComponent},
    { path: 'formPersona', component: FormPersonaComponent},
    { path: 'caja', component: CajaComponent},
    { path: 'pos', component: PosComponent},
  ];