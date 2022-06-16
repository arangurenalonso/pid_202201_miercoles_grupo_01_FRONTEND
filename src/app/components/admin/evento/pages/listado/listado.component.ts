import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventoIncidente } from 'src/app/model/EventoIncidente';
import { EventoService } from 'src/app/services/eventoService';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  eventoIncidente: EventoIncidente[];  

 
  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;


  constructor(
    private eventoService: EventoService,
    public modalService:ModalService
  ) { }

  ngOnInit(): void {
    this.paginacion()
  }
  paginacion() {
    let filtroURL=`/paginacion?numeroDePagina=${this.pageNumber}&pageSize=${this.pageSize}&sortDir=asc` //&filtro=${this.filtro}&filtroBy=${this.filtroBy}
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
}
   