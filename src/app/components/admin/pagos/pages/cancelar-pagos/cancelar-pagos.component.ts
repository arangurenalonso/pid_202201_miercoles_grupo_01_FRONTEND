import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CancelarPagoDTO } from 'src/app/dto/CancelarPagoDTO';
import { Departamento } from 'src/app/model/departamento';
import { ProgramacionPagos } from 'src/app/model/ProgramacionPagos';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { PagosServicioService } from 'src/app/services/pagosServicioService';
import { ProgramacionPagosService } from 'src/app/services/programacionPagosService';
import Swal from 'sweetalert2';

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
  pagosPendientes: ProgramacionPagos[];
  departamentoSeleccionado: Departamento
  montoTotalPagar:number=0.00

  pagosACancelar: ProgramacionPagos[]=[];
  //(change)="valueChange(model.units,unit,$event)"
  now:Date=new Date()
  constructor(private _formBuilder: FormBuilder,
    private departamentoService: DepartamentoService,
    private programacionPagosService: ProgramacionPagosService,
    private pagosServicioService:PagosServicioService
    ) { }

  ngOnInit() {
    this.agregarValidaciones()
   this.now.getTime();
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
    this.departamentoService.getDepartamentosDisponibles()
      .subscribe(response => {
        this.departamentos = response as Departamento[];
      });
  }

  goForwardStep1(stepper: MatStepper) {
    this.departamentoSeleccionado = this.firstFormGroup.value.firstCtrl
    this.programacionPagosService.obtenerPagosPendientes(this.departamentoSeleccionado.id)
      .subscribe(response => {
        let ppLista=response.detalle.data
        let ppListaChecked=ppLista.map(x=>{
           x.checked=false
           return x
        })
        this.pagosPendientes=ppListaChecked
        console.log(this.pagosPendientes)
        stepper.next();
      })
   
  }
  goForwardStep2(stepper: MatStepper) {
    this.pagosACancelar=this.pagosPendientes.filter(x=>x.checked==true)    
    stepper.next();
  }
  volverPrincipio(stepper: MatStepper) {
    this.pagosACancelar=[]
    stepper.reset()
  }
  valueChange(pp:ProgramacionPagos,$event){
    this.pagosPendientes=this.pagosPendientes.map(
        x=>{
          if(x.id==pp.id){
            x.checked=$event.checked
            this.montoTotalPagar=$event.checked?this.montoTotalPagar+x.costo:this.montoTotalPagar-x.costo
          }
          
          return x
        }
      )
    this.pagosACancelar=this.pagosPendientes.filter(x=>x.checked==true)
  }
  
  procesarPago(){
    Swal.fire({
      title: `Está seguro que desea Procesar el pago? monto total: S/.${this.montoTotalPagar}`,

     
      text: `No va a poder revertir estos cambios!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Procesar Pago!'
    }).then((result) => {
       if (result.isConfirmed) {
       let cancelarPagoDTO=new CancelarPagoDTO()
       cancelarPagoDTO.departamento=this.departamentoSeleccionado
       cancelarPagoDTO.pagosACancelar=this.pagosACancelar
        this.pagosServicioService.cancelarServicios(cancelarPagoDTO)
        .subscribe(response => {
          console.log("Pago Cancelados Exitosamento"+response)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Los Pagos fueron cancelados de forma exitosa`,
            showConfirmButton: false,
            timer: 1500
          })
          //this.router.navigate(['/admin/departamentos/listado'])
        },
          err => {
            console.log(err)
            console.log(err.error)
          }
        )
      } else if (result.isDenied) {

      }
    })
  
  }

}
