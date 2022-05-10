import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietarioRoutingModule } from './propietario-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { ModalMascotaComponent } from './pages/modal-mascota/modal-mascota.component';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { AddComponent } from './pages/add/add.component';


import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalFamiliarComponent } from './pages/modal-familiar/modal-familiar.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ModalPropietariodepartamentoComponent } from './pages/modal-propietariodepartamento/modal-propietariodepartamento.component';
import { ModalPropietarioDatosUpdateComponent } from './pages/modal-propietario-datos-update/modal-propietario-datos-update.component';
@NgModule({
  declarations: [
    ListadoComponent,
    DetalleComponent,
    ModalMascotaComponent,
    AddComponent,
    ModalFamiliarComponent,
    ModalPropietariodepartamentoComponent,
    ModalPropietarioDatosUpdateComponent,
  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    PropietarioRoutingModule,
    SharedModule,

    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule
  ]
})
export class PropietarioModule { }
