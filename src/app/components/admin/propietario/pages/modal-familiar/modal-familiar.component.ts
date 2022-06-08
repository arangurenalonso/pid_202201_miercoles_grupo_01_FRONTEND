import { Component, Input, OnInit } from '@angular/core';
import { FamiliarDTO } from 'src/app/dto/FamiliarDTO';
import { Respuesta } from 'src/app/dto/Respuesta';
import { Propietario } from 'src/app/model/propietario';
import { FamiliarService } from 'src/app/services/familiar.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-familiar',
  templateUrl: './modal-familiar.component.html',
  styleUrls: ['./modal-familiar.component.scss']
})
export class ModalFamiliarComponent implements OnInit {

  @Input() familiarSeleccionado: FamiliarDTO 
  @Input() propietario: Propietario
  public errores: any
  myFilter = (d: Date | null): boolean => {
    return d <= new Date();
  };


  constructor(public modalService: ModalService, private familiarService: FamiliarService) { }

  ngOnInit(): void {
  
    console.log(this.propietario);
  }
  cerrarModal() {
    this.familiarSeleccionado = null
    this.errores=null 
    this.modalService.cerrarFamiliarModal()
    //this.propietario=null 
  }
  create() {
    console.log(this.familiarSeleccionado)
    console.log(this.propietario)
    this.familiarService.create(this.familiarSeleccionado, this.propietario.id).subscribe
      (response => {
        console.log("Familiar creado con exito" + response)
        this.modalService.notificarFamiliar.emit(response.detalle.data);
        Swal.fire({
          icon: 'success',
          title: "Familiar creado correctamente!!",
          text: `${this.familiarSeleccionado.nombre} es el nuevo familiar de ${this.propietario.persona.nombre}`,
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
  update() {
    console.log(this.familiarSeleccionado)
    this.familiarService.actualizar(this.familiarSeleccionado, this.propietario.id).subscribe
      (response => {
        console.log("Familiar actualizado con exito" + response)
        this.modalService.notificarFamiliar.emit(response.detalle.data);
        Swal.fire({
          icon: 'success',
          title: "Familiar actualizado correctamente!!",
          text: `${this.familiarSeleccionado.nombre} ${this.familiarSeleccionado.apellido} ha sido actualizado correctamente`,
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

}
