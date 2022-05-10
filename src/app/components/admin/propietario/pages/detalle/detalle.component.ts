import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FamiliarDTO } from 'src/app/dto/FamiliarDTO';
import { MascotaDTO } from 'src/app/dto/MascotaDTO';
import { Familiar } from 'src/app/model/familiar';
import { Mascota } from 'src/app/model/Mascota';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioDepartamento } from 'src/app/model/propietarioDepartamento';
import { FamiliarService } from 'src/app/services/familiar.service';
import { FileService } from 'src/app/services/file.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { ModalService } from 'src/app/services/modal.service';
import { PropietarioService } from 'src/app/services/propietarioservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  public propietario: Propietario 
  public errores: string[]
  
  public mascotaSeleccionada:MascotaDTO;
  public familiarSeleccionado:FamiliarDTO;
  public propietariodepartamento:PropietarioDepartamento[]=[]

  public fotoSeleccionada: File;
  public progreso: number = 0;




  constructor(
    private propietarioService: PropietarioService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private modalService:ModalService,
    private filseService:FileService,
    private mascotaService:MascotaService,
    private familiarService:FamiliarService
    ) {
    this.cargarInformacion()
    this.escucharMascotaModal()
    this.escucharFamiliarModal()
    this.escucharlDepartamentoPropietari()
   }

  ngOnInit(): void { 
    
  }
  public cargarInformacion(): void {
    this.activatedRoute.params.subscribe(params => {
      
      let id = params['id']
      if (id) {
        this.propietarioService.findPropietarioByID(id).subscribe(
          response=>{
            let propietario:Propietario=response.detalle.data
            this.propietario=propietario
            this.propietariodepartamento=propietario.propietarioDepartamentos
            console.log(this.propietario)
          }
        )
        
      }
    })   
  }

  
  public changeActiveMascota(mascota: Mascota): void {
    let tipoObjeto:String="Mascota"
    Swal.fire({
      title: mascota.isActive? `Está seguro que desea DESACTIVAR la ${tipoObjeto}?`:`Está seguro que desea ACTIVAR la ${tipoObjeto}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.mascotaService.changeActive(mascota).subscribe(
          (response) => {
            Swal.fire(response.detalle.mensaje, '', 'success')
            this.cargarInformacion()
          }
        )
      } else if (result.isDenied) {

      }
    })
  }
  public changeActiveFamiliar(familiar: Familiar): void {
    let tipoObjeto:String="Familiar"
    Swal.fire({
      title: familiar.persona.estado? `Está seguro que desea DESACTIVAR al ${tipoObjeto}?`:`Está seguro que desea ACTIVAR al ${tipoObjeto}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.familiarService.changeActive(familiar).subscribe(
          (response) => {
            Swal.fire(response.detalle.mensaje, '', 'success')
            this.cargarInformacion()
          }
        )
      } else if (result.isDenied) {

      }
    })
  }
  escucharlDepartamentoPropietari(){
    this.modalService.notificarPropietarioDepartamento.subscribe((a)=>{
      this.cargarInformacion()
    })
  }
  escucharMascotaModal(){
    this.modalService.notificarMascota.subscribe(mascota=>{
      console.log(mascota)
      this.cargarInformacion()
    })
  }
  escucharFamiliarModal(){
    this.modalService.notificarFamiliar.subscribe(familiar=>{
      console.log(familiar)
      this.cargarInformacion()
    })
  }
  abrirModalDepartamentoPropietario(){
    this.modalService.abrirPropietarioDepartamentoModal()
  }
  abrirModalMascota(mascota:Mascota){
    if(mascota!=null){
      let mascotaDTO=new MascotaDTO()
      mascotaDTO.id=   mascota.id;
      mascotaDTO.tipoMascota=  mascota.tipoMascota;
      mascotaDTO.nombre=  mascota.nombre;
      mascotaDTO.raza=  mascota.raza;
      this.mascotaSeleccionada=mascotaDTO
    }else{
      this.mascotaSeleccionada=new MascotaDTO()
    }
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
      this.familiarSeleccionado=familiarDTO
    }else{
      this.familiarSeleccionado=new FamiliarDTO()
    }
    this.modalService.abrirFamiliarModal()
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (this.fotoSeleccionada) {
      this.filseService.subirFoto(this.fotoSeleccionada, this.propietario.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100)
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cargarInformacion()
            this.filseService.notificarUploadFoto.emit(event.body)
            Swal.fire({
              icon: 'success',
              title: "la foto se ha subido completamente!!",
              text: `${event.body}`,
            })
          }
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: "Error al momento de subir la foto",
        text: `Debe seleccionar una foto`,
      })
    }

  }
}
 