import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamiliarDTO } from 'src/app/dto/FamiliarDTO';
import { Familiar } from 'src/app/model/familiar';
import { Mascota } from 'src/app/model/Mascota';
import { Propietario } from 'src/app/model/propietario';
import { ModalService } from 'src/app/services/modal.service';
import { PropietarioService } from 'src/app/services/propietarioservice';

@Component({
  selector: 'app-form',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  public propietario: Propietario 
  public titulo: String = "Crear Propietario"
  public errores: string[]
  mascotaSeleccionada:Mascota;
  familiarSeleccionado:FamiliarDTO;

  

  constructor(private propietarioService: PropietarioService, private router: Router, private activatedRoute: ActivatedRoute,private modalService:ModalService) {
    this.cargarInformacion()
    this.escucharMascotaModal()
    this.escucharFamiliarModal()
   }

  ngOnInit(): void { 
    
  }
  public cargarInformacion(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.propietarioService.findPropietarioByID(id).subscribe(
          response=>{
            console.log("Cargar Propietarios")
            console.log(response.detalle.data)
            this.propietario=response.detalle.data
            console.log(this.propietario)
          }
        )
        this.titulo = 'Editar Propietario'
        
      }
    })


   
  }

  escucharMascotaModal(){
    this.modalService.notificarMascota.subscribe(mascota=>{
      console.log("Notificacion correcta")
      console.log(mascota)
      this.cargarInformacion()
    })
  }
  escucharFamiliarModal(){
    this.modalService.notificarFamiliar.subscribe(familiar=>{
      console.log("Notificacion correcta")
      console.log(familiar)
      this.cargarInformacion()
    })
  }
  abrirModalMascota(mascota:Mascota){
  
    this.mascotaSeleccionada=(mascota!=null)?mascota:new Mascota()
    this.modalService.abrirMascotaModal()
  }

  abrirModalFamiliar(familiar:Familiar){

    if(familiar!=null){
      let familiarDTO=new FamiliarDTO()
      familiarDTO.id=   familiar.id,
      familiarDTO.birthdayDate=  familiar.birthdayDate,
      familiarDTO.parentesco=  familiar.parentesco,
      familiarDTO.nombre=  familiar.persona.nombre,
      familiarDTO.apellido=  familiar.persona.apellido,
      familiarDTO.dni=  familiar.persona.dni
    }else{
      this.familiarSeleccionado=new FamiliarDTO()
    }
    this.modalService.abrirFamiliarModal()
  }
}
 