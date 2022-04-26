import { Component, Input, OnInit } from '@angular/core';
import { MascotaDTO } from 'src/app/dto/MascotaDTO';
import { Respuesta } from 'src/app/dto/Respuesta';
import { Mascota } from 'src/app/model/Mascota';
import { Propietario } from 'src/app/model/propietario';
import { MascotaService } from 'src/app/services/mascota.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-mascota',
  templateUrl: './modal-mascota.component.html',
  styleUrls: ['./modal-mascota.component.scss']
})
export class ModalMascotaComponent implements OnInit {

  @Input() mascotaSeleccionada: MascotaDTO
  @Input() propietario:Propietario
  public errores: any
  titulo: string = "Crear Mascota"


  constructor(public modalService: ModalService, private mascotaService: MascotaService) { }

  ngOnInit(): void { 
  }
  cerrarModal() {
    this.mascotaSeleccionada=null
    this.modalService.cerrarMascotaModal()
    this.errores=null 
  }
  create() {
    console.log("Entro a crear mascota")
    console.log("mascota: "+this.mascotaSeleccionada)
    console.log("propietario: "+this.propietario)
    this.mascotaService.create(this.mascotaSeleccionada, this.propietario.id).subscribe
    (response => {
      console.log("Mascota creado con exito"+response)
      this.modalService.notificarMascota.emit(response.detalle.data);
      Swal.fire({
        icon: 'success',
        title: "Mascota creada correctamente!!",
        text: `${this.mascotaSeleccionada.nombre} es la nueva mascota de ${this.propietario.persona.nombre}`,
      })
      this.cerrarModal()
      
    },
    err => {
      console.log(err)
      let respuesta: Respuesta = err.error
      this.errores = respuesta.detalle.data
    }
    )
   }
  update() { }
}
