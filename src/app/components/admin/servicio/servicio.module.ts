import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
import { FormComponent } from './pages/form/form.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    MatPaginatorModule,   
    SharedModule,
    FormsModule,
  ]
})
export class ServicioModule { }
