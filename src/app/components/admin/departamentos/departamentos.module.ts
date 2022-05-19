import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './pages/form/form.component';
import { SharedModule } from '../../shared/shared/shared.module';


@NgModule({
  declarations: [ 
    ListadoComponent,
    FormComponent,
  ],
  imports: [ 
    CommonModule,    
    FormsModule,
    DepartamentosRoutingModule,
    SharedModule
  ]
})
export class DepartamentosModule { }
