import { Component, OnInit } from '@angular/core';
import { VisitaDTO } from 'src/app/dto/VisitaDTO';
import { Visita } from 'src/app/model/visita';
import { ModalService } from 'src/app/services/modal.service';
import { VisitaService } from 'src/app/services/visita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-finalizar-visita',
  templateUrl: './modal-finalizar-visita.component.html',
  styleUrls: ['./modal-finalizar-visita.component.scss']
})
export class ModalFinalizarVisitaComponent implements OnInit {
  titulo:String ="Finalizar Visita"
  visita:Visita
  visitaDTO:VisitaDTO=new VisitaDTO()
  constructor(public modalService:ModalService,
    public visitaService:VisitaService) { }

  ngOnInit(): void {
    this.escucharAperturaModalFinalizarVisita()
  }

  cerrarModal(){
    this.modalService.cerrarModalFinalizarVisita()
  }

  escucharAperturaModalFinalizarVisita() {   
    this.modalService.notificarAbrirModalFinalizarVisita.subscribe((id) => {
      this.visitaService.buscarVisita(id).subscribe(response=>{
        
        this.visita = response.detalle.data as Visita;
        console.log(this.visita)
        this.visitaDTO.id=this.visita.id
        this.visitaDTO.fechaHoraSalida=new Date()
      })
    })
  }

  finalizarVisita(){
    console.log(this.visitaDTO)
    this.visitaService.finalizarVisita(this.visitaDTO).subscribe(response => {
      this.cerrarModal()
      Swal.fire({
        icon: 'success',
        title: "Finalización de visita!!",
        text: `Visita Finalizada correctamente`,
      })
      this.cerrarModal()

    },
      err => {
        console.log(err)
       
      })
  }
}
