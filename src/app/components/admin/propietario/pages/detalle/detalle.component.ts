import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private propietarioService: PropietarioService, private router: Router, private activatedRoute: ActivatedRoute,private modalService:ModalService) {
    this.cargarInformacion()
    this.escucharMascotaModal()
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

  abrirModal(mascota:Mascota){
    if(mascota!=null){
      this.mascotaSeleccionada=mascota
     
    }
    this.mascotaSeleccionada=new Mascota()
    this.modalService.abrirMascotaModal()
  }
}
 