import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Departamento } from 'src/app/model/departamento';
import { EventoIncidente } from 'src/app/model/EventoIncidente';
import { Incidente } from 'src/app/model/Incidente';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { EventoService } from 'src/app/services/eventoService';
import { IncidenteService } from 'src/app/services/IncidenteService';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  eventoIncidente: EventoIncidente[];  

  public departamentos: Departamento[] = []
  public incidentes: Incidente[] = []
  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public depId=-1;
  public inciID=-1;

  constructor( 
    private eventoService: EventoService,
    public modalService:ModalService,
    
    private incidenteService: IncidenteService,
    private departamentoService: DepartamentoService,
  ) { }

  ngOnInit(): void {
    this.cargarComboBox()
    this.paginacion()
    this.escucharCierreModalFinalizacionIncidente()
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
  paginacion() {
    let filtroURL=`/paginacion?numeroDePagina=${this.pageNumber}&pageSize=${this.pageSize}&sortDir=asc&departamento=${this.depId}&incidente=${this.inciID}` //&filtro=${this.filtro}&filtroBy=${this.filtroBy}
    console.log(filtroURL)
    this.eventoService.paginacion(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.eventoIncidente = response.detalle.data.contenido as EventoIncidente[];
      console.log(this.eventoIncidente)
    });

  }
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.paginacion()
  }

  escucharCierreModalFinalizacionIncidente() {
   
    this.modalService.notificarCerrarModalFinalizarIncidente.subscribe(() => {
      this.paginacion()
    })
  }

  abrirModalFinalizarVisita(obj) {
    this.modalService.abrirModalFinalizarIncidente(obj)
  }
  filtrarDepartamento() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    this.pageNumber = 0
    this.inciID = -1
    this.paginacion()
  }

  filtraIncidente() {
    this.pageNumber = 0
    this.depId = -1
    this.paginacion()
  }
}
   