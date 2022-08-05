import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpresasComponent } from 'src/app/components/empresas/empresas.component';
import { PantallaBienvenidaComponent } from 'src/app/components/pantalla-bienvenida/pantalla-bienvenida.component';
import { PantallaDescansoComponent } from 'src/app/components/pantalla-descanso/pantalla-descanso.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'pantalla-descanso', component: PantallaDescansoComponent },
      { path: 'pantalla-bienvenida', component: PantallaBienvenidaComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: '**', redirectTo: 'pantalla-descanso' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class KioscoRoutingModule { }
