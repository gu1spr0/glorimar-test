import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CajaComponent } from 'src/app/components/caja/caja.component';
import { FormPersonaComponent } from 'src/app/components/form-persona/form-persona.component';
import { AppPosComponent } from 'src/app/components/metodos-de-pagos/app-pos/app-pos.component';
import { MensajeConfirmacionComponent } from 'src/app/components/metodos-de-pagos/mensaje-confirmacion/mensaje-confirmacion';
import { MetodosDePagosComponent } from 'src/app/components/metodos-de-pagos/metodos-de-pagos.component';
import { EnviarQrComponent } from 'src/app/components/metodos-de-pagos/qr/enviar-qr/enviar-qr.component';
import { QrComponent } from 'src/app/components/metodos-de-pagos/qr/qr.component';
import { TarjetaComponent } from 'src/app/components/metodos-de-pagos/tarjeta/tarjeta.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'app-pos', component: AppPosComponent },
      { path: 'metodos-de-pago', component: MetodosDePagosComponent },
      { path: 'qr', component: QrComponent },
      { path: 'enviar-qr', component: EnviarQrComponent },
      { path: 'formPersona', component: FormPersonaComponent },
      { path: 'caja', component: CajaComponent },
      { path: 'tarjeta', component: TarjetaComponent },
      { path: 'mensaje-confirmacion', component: MensajeConfirmacionComponent },
      { path: '**', redirectTo: 'metodos-de-pago' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoRoutingModule { }
