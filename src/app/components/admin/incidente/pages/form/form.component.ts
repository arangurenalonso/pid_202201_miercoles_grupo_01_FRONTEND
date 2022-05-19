import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IncidenteDTO } from 'src/app/dto/IncidenteDTO';
import { Respuesta } from 'src/app/dto/Respuesta';
import { IncidenteService } from 'src/app/services/IncidenteService';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public incidente: IncidenteDTO = new IncidenteDTO()
  public titulo: String = "Registrar Incidente"
  public errores: any
  constructor(private incidenteService: IncidenteService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarInformación()
  }

  public cargarInformación(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.incidenteService.findById(id).subscribe(
          response=>{
            console.log(response)
            this.incidente=response.detalle.data
          }
        )
        this.titulo = 'Editar Incidente'
      }
    }) 
  }
  public create(): void {
    
    this.incidenteService.registrar(this.incidente)
      .subscribe(response => {
        console.log("response!")
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `El Incidente  ${response.detalle.data.nombre}; fue creado de forma exitosa`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/incidente/listado'])
      },
        err => {
          let respuesta:Respuesta=err.error
          this.errores=respuesta.detalle.data
        }
      )
  }
  
  public update(): void {
    this.incidenteService.actualizar(this.incidente).subscribe(
      response => {
        this.router.navigate(['/admin/incidente/listado'])
        swal.fire({

          position: 'center',
          icon: 'success',
          title: `${response.reason} -> Id: ${response.detalle.data.id}`,
          showConfirmButton: false,
          timer: 2500
        })

      },
      err => {
        let respuesta:Respuesta=err.error
        console.log("ERROR EN LA PETICION:")
        console.log(err)
        this.errores=respuesta.detalle.data
        
      }
    )
  }

}
