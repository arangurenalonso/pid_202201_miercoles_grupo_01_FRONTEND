import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoIncidenteDTO } from 'src/app/dto/EventoIncidenteDTO';
import { Respuesta } from 'src/app/dto/Respuesta';
import { Departamento } from 'src/app/model/departamento';
import { EventoIncidente } from 'src/app/model/EventoIncidente';
import { Incidente } from 'src/app/model/Incidente';
import { Persona } from 'src/app/model/persona';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { EventoService } from 'src/app/services/eventoService';
import { IncidenteService } from 'src/app/services/IncidenteService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  public evento: EventoIncidente = {
    id: 0,
    departamento: {
      id: -1,
      depnumero: "",
      deptelef: "",
      estado: true,
      personaRegistro: new Persona(),
      piso: -1,
      aforo: -1,
    },
    incidente: {
      id: -1,
      nombre: "",
      descripcion: "",
      createAt: new Date(),
      isActive: true,
      personaRegistro: new Persona(),
    },
    estado: 1,
    comentario: "",
    historialIncidentes:[]
  };

  public departamentos: Departamento[] = []
  public incidentes: Incidente[] = []
  public titulo: String = "Registrar Evento"
  public errores: any
  constructor(private departamentoService: DepartamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventoService: EventoService,
    private incidenteService: IncidenteService
  ) { }

  ngOnInit(): void {
    this.cargarComboBox()
  }

  public cargarComboBox(): void {

    this.departamentoService.getAllDepartamento().subscribe(
      response => {
        console.log(response)
        this.departamentos = response
      }
    )
    this.incidenteService.all().subscribe(
      response => {
        console.log(response)
        this.incidentes = response.detalle.data
      }
    )
  }
  public create(): void {
    console.log(this.evento)
    let obj: EventoIncidenteDTO = new EventoIncidenteDTO()
    obj.departamento_id = this.evento.departamento.id
    obj.comentario = this.evento.comentario
    obj.incidente_id = this.evento.incidente.id
    console.log(obj)
    this.eventoService.registrar(obj)
      .subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `El eventoha sido registrado de forma exitosa`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/eventos/listado'])
      },
        err => {
          let respuesta: Respuesta = err.error
          this.errores = respuesta.detalle.data
        }
      )
  }


}
