import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'nuevo',component:AddComponent},
      {path:'edit',component:EditComponent},
      {path:'listado',component:ListadoComponent},
      
      {path:'**',redirectTo:'listado'}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropietarioRoutingModule { }
