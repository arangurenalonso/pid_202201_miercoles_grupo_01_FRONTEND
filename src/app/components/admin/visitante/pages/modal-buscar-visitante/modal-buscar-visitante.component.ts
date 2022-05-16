import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Visitante } from 'src/app/model/visitante';
import { ModalService } from 'src/app/services/modal.service';
import { VisitanteService } from 'src/app/services/visitante.service';

@Component({
  selector: 'app-modal-buscar-visitante',
  templateUrl: './modal-buscar-visitante.component.html',
  styleUrls: ['./modal-buscar-visitante.component.scss']
})
export class ModalBuscarVisitanteComponent implements OnInit {
  public titulo:String ="Buscar Visitante"
  public visitantes: Visitante[];
  public paginator
  public pagSizeOption=[2,3,4,5]
  public pageNumber=0;
  public pageSize=4;
  public filtro:string='';
  public filtroBy:string="nombreyapellido"
  
  constructor(public modalService:ModalService,
    private visitanteService: VisitanteService) { }

  ngOnInit(): void {
    this.consultaApiBuscarVisitante()
  }
  buscarVisitante() {
    this.pageNumber=0
    this.consultaApiBuscarVisitante()
  }
  consultaApiBuscarVisitante() {
  
    let filtroURL=`/paginacion?numeroDePagina=${this.pageNumber}&pageSize=${this.pageSize}&filtro=${this.filtro}&filtroBy=${this.filtroBy}&sortDir=asc&sortBy=p.nombre` 
    
    this.visitanteService.buscarVisitante(filtroURL)
        .subscribe(response => {
          this.paginator = response.detalle.data;
          this.visitantes = response.detalle.data.contenido as Visitante[];
        });
  }
  cerrarModal() {
    this.modalService.cerrarModalBuscarVisitante(null)
    
  }
  seleccionarVisitante(visitante:Visitante){
    this.modalService.cerrarModalBuscarVisitante(visitante);
  }

  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.consultaApiBuscarVisitante()
  }

}
