import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Departamento } from 'src/app/model/departamento';
import { DepartamentoService } from 'src/app/services/departamentoservice';

@Component({
  selector: 'app-cancelar-pagos',
  templateUrl: './cancelar-pagos.component.html',
  styleUrls: ['./cancelar-pagos.component.scss']
})
export class CancelarPagosComponent implements OnInit {
  titulo: String = "Modulo Cancelacion de Pagos"
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  departamentos: Departamento[];
  departamentoSeleccionado: Departamento
  constructor(private _formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,) { }

  ngOnInit() {
    this.agregarValidaciones()
    this.listarDepartamentos()
  }

  agregarValidaciones() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  listarDepartamentos() {
    console.log("listarDepartamentos()")
    this.departamentoService.getDepartamentosDisponibles()
      .subscribe(response => {
        this.departamentos = response as Departamento[];
        console.log(response)
        console.log(this.departamentos)
      });
    console.log("listarDepartamentos()")
  }

  goForwardStep1(stepper: MatStepper) {
    console.log(this.firstFormGroup.value.firstCtrl)
    console.log("goForwardStep1")
    stepper.next();
  }
  goForwardStep2(stepper: MatStepper) {
    console.log("goForwardStep2")
    stepper.next();
  }
  goBackStep2(stepper: MatStepper) {
    console.log("goBackStep2")
    stepper.previous();
  }
}
