import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitanteRoutingModule } from './visitante-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormComponent } from './pages/form/form.component';
import { FormsModule } from '@angular/forms';
import { GestionVisitaComponent } from './pages/gestion-visita/gestion-visita.component';
import { ProgramarVisitaComponent } from './pages/programar-visita/programar-visita.component';
import { ModalBuscarVisitanteComponent } from './pages/modal-buscar-visitante/modal-buscar-visitante.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatPaginatorModule} from '@angular/material/paginator';
 
@NgModule({
  declarations: [
    ListadoComponent,
    FormComponent,
    GestionVisitaComponent,
    ProgramarVisitaComponent,
    ModalBuscarVisitanteComponent
  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    VisitanteRoutingModule,
    MatRadioModule,
    MatPaginatorModule
  ]
})
export class VisitanteModule { }
