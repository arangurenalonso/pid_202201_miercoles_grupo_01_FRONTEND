import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelarPagosComponent } from './pages/cancelar-pagos/cancelar-pagos.component';
import { ListadoPagosComponent } from './pages/listado-pagos/listado-pagos.component';
import { ProgramacionPagosComponent } from './pages/programacion-pagos/programacion-pagos.component';

const routes: Routes = [
  {
    path: '',
    children: [

      
      { path: 'programarPagos', component: ProgramacionPagosComponent },
      { path:'cancelarPagos', component:CancelarPagosComponent},
      { path: 'listadoPagos', component: ListadoPagosComponent },
      { path: '**', redirectTo: 'listadoPagos' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
 

