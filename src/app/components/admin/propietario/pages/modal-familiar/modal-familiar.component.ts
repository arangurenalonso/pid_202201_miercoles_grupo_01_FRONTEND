import { Component, Input, OnInit } from '@angular/core';
import { FamiliarDTO } from 'src/app/dto/FamiliarDTO';
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
  @Input() propietario:Propietario
  myFilter = (d: Date | null): boolean => {
   
    // Prevent Saturday and Sunday from being selected.
    return d <=new Date();
  };
  titulo: string = "Crear Familiar"


  constructor(public modalService: ModalService, private familiarService: FamiliarService) { }

  ngOnInit(): void {
  }
  cerrarModal() {
    this.familiarSeleccionado=null
    this.modalService.cerrarFamiliarModal()
    this.propietario=null
  }
  create() {
    console.log(this.familiarSeleccionado)
    console.log(this.propietario)
    this.familiarService.create(this.familiarSeleccionado, this.propietario.id).subscribe
    (response => {
      console.log("Familiar creado con exito"+response)
      this.modalService.notificarFamiliar.emit(response.detalle.data);
      Swal.fire({
        icon: 'success',
        title: "Familiar creado correctamente!!",
        text: `${this.familiarSeleccionado.nombre} es el nuevo familiar de ${this.propietario.persona.nombre}`,
      })
      this.cerrarModal()
      
    },
      err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Error al registrar al familiar - ${err.error.detalle.mensaje}`,
          showConfirmButton: false
        })
        console.error("Error en el creado de mascota")
        console.error(err)
      }
    )
   }
  update() { }

}
 