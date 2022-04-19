import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { ModalMascotaComponent } from './pages/modal-mascota/modal-mascota.component';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './pages/detalle/detalle.component';


@NgModule({
  declarations: [
    ListadoComponent,
    DetalleComponent,
    ModalMascotaComponent
  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    PropietarioRoutingModule
  ]
})
export class PropietarioModule { }
