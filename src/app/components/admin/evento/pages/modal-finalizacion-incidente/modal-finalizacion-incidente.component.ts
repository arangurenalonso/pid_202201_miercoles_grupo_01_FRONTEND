import { Component, OnInit } from '@angular/core';
import { EventoIncidenteDTO } from 'src/app/dto/EventoIncidenteDTO';
import { EventoIncidente } from 'src/app/model/EventoIncidente';
import { EventoService } from 'src/app/services/eventoService';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-finalizacion-incidente',
  templateUrl: './modal-finalizacion-incidente.component.html',
  styleUrls: ['./modal-finalizacion-incidente.component.scss']
})
export class ModalFinalizacionIncidenteComponent implements OnInit {

  evento:EventoIncidente
  eventoDTO:EventoIncidenteDTO=new EventoIncidenteDTO()
  constructor(
    public modalService: ModalService,
    private eventoService: EventoService,
    ) { }

  ngOnInit(): void {
    this.escucharAperturaModalFinalizarIncidente()
  }
  escucharAperturaModalFinalizarIncidente() {      
    this.modalService.notificarAbrirModalFinalizarIncidente.subscribe((obj) => {     
      this.evento=obj     
    })
  }
  cerrarModal(){
    this.evento = null
    this.modalService.cerrarModalFinalizarIncidente()
  }
  finalizarEvento(){
    this.eventoDTO.departamento_id=this.evento.departamento.id
    this.eventoDTO.incidente_id=this.evento.incidente.id
    this.eventoDTO.id=this.evento.id
    this.eventoDTO.estado=2
    console.log(this.eventoDTO)
    this.eventoService.actualizarEstado(this.eventoDTO).subscribe(response => {
      this.cerrarModal()
      Swal.fire({
        icon: 'success',
        title: "Finalización del Incidente!!",
        text: `Incidente Finalizada correctamente`,
      })
      this.cerrarModal()

    },
      err => {
        console.log(err)
       
      })
  }
}
 