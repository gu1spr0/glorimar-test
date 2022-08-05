import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'kiosco',
        loadChildren: () => import('./modules/kiosco/kiosco.module').then(m => m.KioscoModule)
    },
    {
        path: 'persona',
        loadChildren: () => import('./modules/persona/persona.module').then(m => m.PersonaModule)
    },
    {
        path: 'catalogo',
        loadChildren: () => import('./modules/catalogo/catalogo.module').then(m => m.CatalogoModule)
    },
    {
        path: 'pago',
        loadChildren: () => import('./modules/pago/pago.module').then(m => m.PagoModule)
    },
    {
        path: '**',
        redirectTo: 'kiosco',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            onSameUrlNavigation: "reload",
        }),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }