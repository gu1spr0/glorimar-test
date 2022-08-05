import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from 'src/app/components/clientes/clientes.component';
import { DeudasComponent } from 'src/app/components/deudas/deudas.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'deudas', component: DeudasComponent },
      { path: '**', redirectTo: 'clientes' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
