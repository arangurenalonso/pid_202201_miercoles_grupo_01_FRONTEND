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
        path: 'departamneto',
        loadChildren: () => import('./departamentos/departamentos.module').then(m=>m.DepartamentosModule)
      },
      {
        path: 'propietario',
        loadChildren: () => import('./propietario/propietario.module').then(m=>m.PropietarioModule)
      },
      { path: '**', redirectTo: 'departamento' }
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
