import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { CategoriasComponent } from 'src/app/components/categorias/categorias.component';
import { MetodosDePagosComponent } from 'src/app/components/metodos-de-pagos/metodos-de-pagos.component';
import { ProductoComponent } from 'src/app/components/producto/producto.component';
import { ProductosComponent } from 'src/app/components/productos/productos.component';
import { SubCategoriasComponent } from 'src/app/components/sub-categorias/sub-categorias.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'categorias', component: CategoriasComponent },
      { path: 'sub-categorias', component: SubCategoriasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'producto', component: ProductoComponent },
      { path: 'carrito', component: CarritoComponent},

      { path: '**', redirectTo: 'categorias' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutingModule { }
