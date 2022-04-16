import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './pages/form/form.component';


@NgModule({
  declarations: [
    ListadoComponent,
    PaginatorComponent,
    FormComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    DepartamentosRoutingModule
  ]
})
export class DepartamentosModule { }
