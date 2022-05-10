import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { GestionVisitaComponent } from './pages/gestion-visita/gestion-visita.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ProgramarVisitaComponent } from './pages/programar-visita/programar-visita.component';

const routes: Routes = [
  {
    path: '',
    children: [

      { path: 'listado/page/:page', component: ListadoComponent },
      { path: 'listado', component: ListadoComponent },
      { path: 'crear', component: FormComponent },
      {path:'update/:id', component:FormComponent},
      { path: 'programar_visita', component: ProgramarVisitaComponent },
      { path: 'gestion_visita', component: GestionVisitaComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitanteRoutingModule { }
 