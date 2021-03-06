import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'listado/page/:page', component: ListadoComponent },
      { path: 'crear', component: AddComponent },
      { path: 'update/:id', component: DetalleComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropietarioRoutingModule { }
