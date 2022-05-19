import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      {
        path: 'departamentos',
        loadChildren: () => import('./departamentos/departamentos.module').then(m=>m.DepartamentosModule)
      },
      {
        path: 'propietario',
        loadChildren: () => import('./propietario/propietario.module').then(m=>m.PropietarioModule)
      },
      {
        path: 'visitante',
        loadChildren: () => import('./visitante/visitante.module').then(m=>m.VisitanteModule)
      },
      {
        path: 'servicio',
        loadChildren: () => import('./servicio/servicio.module').then(m=>m.ServicioModule)
      },
      {
        path: 'incidente',
        loadChildren: () => import('./incidente/incidente.module').then(m=>m.IncidenteModule)
      },
      { path: '**', redirectTo: 'departamentos' }
    ]
  },
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }
