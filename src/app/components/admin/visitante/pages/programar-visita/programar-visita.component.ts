import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitaDTO } from 'src/app/dto/VisitaDTO';
import { Departamento } from 'src/app/model/departamento';
import { Propietario } from 'src/app/model/propietario';
import { Visita } from 'src/app/model/visita';
import { Visitante } from 'src/app/model/visitante';
import { ModalService } from 'src/app/services/modal.service';
import { PropietarioService } from 'src/app/services/propietarioservice';
import { VisitaService } from 'src/app/services/visita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programar-visita',
  templateUrl: './programar-visita.component.html',
  styleUrls: ['./programar-visita.component.scss']
})
export class ProgramarVisitaComponent implements OnInit {

  constructor(private router: Router,
    public modalService: ModalService,
    private propietarioService: PropietarioService,
    private visitaService: VisitaService
  ) { }
  
  public propietarios: Propietario[];
  public departamentos: Departamento[] = []

  public fechaHoraLlegada: Date
  public isHabilitado: boolean = true
  public motivoVisita: string

  public propietarioSeleccionado: Propietario = new Propietario()
  public visitanteSeleccionado: Visitante;
  public departamentoSeleccionado: Departamento;

  public isVisitanteSeleccionado: boolean = false
  public isPropietarioSeleccionado: boolean = false
  public isDepartamentoSeleccionado: boolean = false
  public isMotivoVisitaSelected: boolean = false

  validarCamposCompletos(): boolean {
    let isValid: boolean = true
    if (this.visitanteSeleccionado == null) {
      isValid = false
      this.isVisitanteSeleccionado = true
    }
    if (this.propietarioSeleccionado.id == -1) {
      isValid = false
      this.isPropietarioSeleccionado = true
    }
    if (this.departamentoSeleccionado == null) {
      isValid = false
      this.isDepartamentoSeleccionado = true
    }
    if (this.motivoVisita == null|| this.motivoVisita.length<5) {
      isValid = false
      this.isMotivoVisitaSelected = true
    }
    
    return isValid;
  }
  escribirMotivoVisita(){
    this.isMotivoVisitaSelected = false
  }
 

  ngOnInit(): void {
    this.fechaHoraLlegada = new Date()
    this.propietarioSeleccionado.id = -1
    this.escucharCierreModalVisitante()
    this.getAllPropietarios()
  }

  getAllPropietarios() {
    this.propietarioService.getAllPropietarios()
      .subscribe(response => {
        this.propietarios = response.detalle.data as Propietario[];
      });
  }

  abrirModalBuscarVisitante() {
    this.modalService.abrirModalBuscarVisitante()
  }

  escucharCierreModalVisitante() {
   
    this.modalService.notificarCerrarModalBuscarVisitante.subscribe((visitante) => {
      if (visitante) {
        this.isVisitanteSeleccionado = false
        this.visitanteSeleccionado = visitante
      }
    })
  }
  cargarDepartamentos() {

    if (this.propietarioSeleccionado.id == -1) {
      this.departamentos = []
      this.departamentoSeleccionado=null
      return
    }
    this.isPropietarioSeleccionado=false
    this.propietarioService.buscarDepartamentoXPropietario(this.propietarioSeleccionado)
      .subscribe(response => {
        this.departamentos = response.detalle.data as Departamento[];
      });

  }
  selecionarDepartamento(dep: Departamento) {
    this.isDepartamentoSeleccionado=false
    this.departamentoSeleccionado = dep
  }
  registrarVisita() {
    if (this.validarCamposCompletos()) {
      let visita = new VisitaDTO()
      visita.propietario_id = this.propietarioSeleccionado.id
      visita.visitante_id = this.visitanteSeleccionado.id
      visita.departamento_id = this.departamentoSeleccionado.id
      visita.motivoVisita = this.motivoVisita
      visita.fechaHoraLlegada = this.fechaHoraLlegada

      console.log(visita)
      this.visitaService.registrar(visita)
        .subscribe(response => {
          console.log(response)

          Swal.fire(
            'Registro Exitoso!',
            'La visita se ha registrado con exito!',
            'success'
          )
          this.router.navigate(['/admin/visitante/gestion_visita'])
        })
    }else{
      Swal.fire(
        'Error!',
        'Error en el ingreso de datos!',
        'error'
      )
    }

  }

}
