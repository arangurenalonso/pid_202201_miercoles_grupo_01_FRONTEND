import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { ProgramacionPagosDTO } from 'src/app/dto/ProgramacionPagosDTO';
import { ProgramacionPagosService } from 'src/app/services/programacionPagosService';
import Swal from 'sweetalert2';
import { CustomMatCalendarHeaderComponent } from '../custom-mat-calendar-header/custom-mat-calendar-header.component';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-programacion-pagos',
  templateUrl: './programacion-pagos.component.html',
  styleUrls: ['./programacion-pagos.component.scss'],
  providers: [

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ProgramacionPagosComponent implements OnInit {

  exampleHeader=CustomMatCalendarHeaderComponent

  today: Date
  sixMonthsLater: Date
  sixMonthsAgo: Date
  date = new FormControl(moment());

  monthSelected:number
  yearSelected:number

  constructor(
    private programacionPagosService:ProgramacionPagosService,
    private router: Router,) { }

  ngOnInit(): void {
    this.today = new Date();
    this.sixMonthsLater = new Date();
    this.sixMonthsLater.setMonth(this.today.getMonth() + 6);
    this.sixMonthsAgo = new Date();
    this.sixMonthsAgo.setMonth(this.today.getMonth() - 6);

    this.monthSelected=this.today.getMonth()+1
    this.yearSelected=this.today.getFullYear()
  }

  openDatePicker(picker) {
    picker.open();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    console.log(this.date.value.format('DD'))
    console.log(this.date.value.format('dddd'))
    console.log(this.date.value.format('MMMM'))
    this.monthSelected=this.date.value.format('M')
    console.log(this.date.value.format('YYYY'))
    this.yearSelected=this.date.value.format('YYYY')
    datepicker.close();
  }

  programarPagos(){
    console.log(this.monthSelected)
    console.log(this.yearSelected)
    let pp:ProgramacionPagosDTO =new ProgramacionPagosDTO()
    pp.month=this.monthSelected
    pp.year=this.yearSelected
    this.programacionPagosService.registrarPagos(pp)
    .subscribe(response => {
      console.log(response)
      this.router.navigate(['/admin/pagos/listadoPagos'])
      Swal.fire({

        position: 'center',
        icon: 'success',
        title: `${response.reason}: ${response.detalle.mensaje}`,
        showConfirmButton: false,
        timer: 2500
      })
    });
  }
}


