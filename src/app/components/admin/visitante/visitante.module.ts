import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitanteRoutingModule } from './visitante-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormComponent } from './pages/form/form.component';
import { FormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    ListadoComponent,
    FormComponent
  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    VisitanteRoutingModule
  ]
})
export class VisitanteModule { }
