import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/dto/Respuesta';
import { ServicioDTO } from 'src/app/dto/ServicioDTO';
import { ServicioService } from 'src/app/services/ServicioService';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
 

  public servicio: ServicioDTO = new ServicioDTO()
  public titulo: String = "Registrar Servicio"
  public errores: any
  constructor(private servicioService: ServicioService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarInformación()
  }

  public cargarInformación(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.servicioService.findById(id).subscribe(
          response=>{
            console.log(response)
            this.servicio=response.detalle.data
          }
        )
        this.titulo = 'Editar Servicio'
      }
    }) 
  }
  public create(): void {
    
    this.servicioService.registrar(this.servicio)
      .subscribe(response => {
        console.log("response!")
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `El Servicio  ${response.detalle.data.nombre}; fue creado de forma exitosa`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/servicio/listado'])
      },
        err => {
          let respuesta:Respuesta=err.error
          this.errores=respuesta.detalle.data
        }
      )
  }
  
  public update(): void {
    this.servicioService.actualizar(this.servicio).subscribe(
      response => {
        this.router.navigate(['/admin/servicio/listado'])
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
