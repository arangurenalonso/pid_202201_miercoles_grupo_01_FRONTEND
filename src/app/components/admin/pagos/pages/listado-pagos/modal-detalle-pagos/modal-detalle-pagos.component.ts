import { Component, OnInit } from '@angular/core';
import { PagoServicio } from 'src/app/model/PagoServicio';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-detalle-pagos',
  templateUrl: './modal-detalle-pagos.component.html',
  styleUrls: ['./modal-detalle-pagos.component.scss']
})
export class ModalDetallePagosComponent implements OnInit {
  
  pagoServicio:PagoServicio
  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
    this.escucharAperturaModalFinalizarVisita()
  }
  escucharAperturaModalFinalizarVisita() {   
   
    this.modalService.notificarAbrirModalDetallePago.subscribe((obj) => {     
      this.pagoServicio=obj     
    })
  }
  cerrarModal(){
    this.pagoServicio = null
    this.modalService.cerrarModalDetallePago()
  }

}
