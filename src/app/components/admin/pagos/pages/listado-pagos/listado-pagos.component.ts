import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PagoServicio } from 'src/app/model/PagoServicio';
import { ModalService } from 'src/app/services/modal.service';
import { PagosServicioService } from 'src/app/services/pagosServicioService';

@Component({
  selector: 'app-listado-pagos',
  templateUrl: './listado-pagos.component.html',
  styleUrls: ['./listado-pagos.component.scss']
})
export class ListadoPagosComponent implements OnInit {

  pagoServicio: PagoServicio[];  

 
  public paginator
  public pagSizeOption=[2,3,4,5]
  
  public pageNumber=0;
  public pageSize=4;
  //public filtro:string='';
  //public filtroBy:string="nombreyapellido"

  constructor(
    private pagoServicioService: PagosServicioService,
    public modalService:ModalService
  ) { }

  ngOnInit(): void {
    this.paginacion()
    this.escucharCierreModalVisitante()
  }
  paginacion() {
    let filtroURL=`/paginacion?numeroDePagina=${this.pageNumber}&pageSize=${this.pageSize}&sortDir=asc` //&filtro=${this.filtro}&filtroBy=${this.filtroBy}
    this.pagoServicioService.paginacion(filtroURL)
    .subscribe(response => {
      console.log(response)
      this.paginator = response.detalle.data;
      this.pagoServicio = response.detalle.data.contenido as PagoServicio[];
      console.log(this.pagoServicio)
    });

  }
  abrirModalDetallePago(obj:PagoServicio) {
    this.modalService.abrirModalDetallePago(obj)
  }
  escucharCierreModalVisitante() {
   
    this.modalService.notificarCerrarModalDetallePago.subscribe(() => {
      
    })
  }
  handlePage(e:PageEvent){
    this.pageSize=e.pageSize
    this.pageNumber=e.pageIndex
    this.paginacion()
  }
}
 