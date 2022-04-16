import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { EditComponent } from './pages/edit/edit.component';
import { AddComponent } from './pages/add/add.component';
import { ListadoComponent } from './pages/listado/listado.component';


@NgModule({
  declarations: [
    EditComponent,
    AddComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    PropietarioRoutingModule
  ]
})
export class PropietarioModule { }
