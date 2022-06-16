import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoRoutingModule } from './evento-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { FormComponent } from './pages/form/form.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ListadoComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    EventoRoutingModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatMomentDateModule,
    MatStepperModule,
    MatRadioModule,
    MatCheckboxModule
  ]
})
export class EventoModule { }
 