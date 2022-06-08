import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { ProgramacionPagosComponent } from './pages/programacion-pagos/programacion-pagos.component';
import { CancelarPagosComponent } from './pages/cancelar-pagos/cancelar-pagos.component';
import { ListadoPagosComponent } from './pages/listado-pagos/listado-pagos.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '../../shared/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CustomMatCalendarHeaderComponent } from './pages/custom-mat-calendar-header/custom-mat-calendar-header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModalDetallePagosComponent } from './pages/listado-pagos/modal-detalle-pagos/modal-detalle-pagos.component';
// const MY_FORMATS = {
//   parse: {
//     dateInput: 'DD MMMM YYYY',
    
//   },
//   display: {
//     dateInput: 'DD MMMM YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
@NgModule({
  declarations: [
    ProgramacionPagosComponent,
    CancelarPagosComponent,
    ListadoPagosComponent,
    CustomMatCalendarHeaderComponent,
    ModalDetallePagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule,
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
  ],
  
  // providers: [
  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class PagosModule { }

    
