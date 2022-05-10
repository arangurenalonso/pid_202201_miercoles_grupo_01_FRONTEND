import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Respuesta } from 'src/app/dto/Respuesta';
import { VisitanteDTO } from 'src/app/dto/VisitanteDTO';
import { Visitante } from 'src/app/model/visitante';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { VisitanteService } from 'src/app/services/visitante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public visitante: VisitanteDTO = new VisitanteDTO()
  public titulo: String = "Crear Visitante"
  public errores: any
  /**
   * NGModel -> Realiza un binding an objeto asignado; es decir enlaza al objeto cliente y rellena los datos del formulario
   *            conforme se rellena los datos
   */
  constructor(private visitanteService: VisitanteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarDatos()
  }

  public cargarDatos(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.visitanteService.buscarPorId(id).subscribe(
          response=>{
            console.log(response)
            this.visitante=response.detalle.data
            console.log(this.visitante)
          })
        this.titulo = 'Editar Visitante'
      }
    })
  }
  public create(): void {
    console.log(this.visitante)

    this.visitanteService.create(this.visitante)
      .subscribe(response => {
        console.log("Visitante se creo con exito")
        console.log(response)
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `El Visitante  ${response.detalle.data.persona.nombre}; fue creado con exito`,
          showConfirmButton: false,
          timer: 3500
        })
        this.router.navigate(['/admin/visitante/listado'])
      },

        err => {
          let respuesta: Respuesta = err.error
          this.errores = respuesta.detalle.data
        }
      )
  }

  public update(): void {
    this.visitanteService.update(this.visitante).subscribe(
      response => {
        this.router.navigate(['/admin/visitante/listado'])
        swal.fire({

          position: 'center',
          icon: 'success',
          title: `${response.reason} -> Id: Departamento ${response.detalle.data.id}`,
          showConfirmButton: false,
          timer: 2500
        })

      },
      err => {
        this.errores = err.error.errors as string[]
        console.error(err)
        console.error("Codigo del error desde el backend" + err.status)
        console.error(err.error)
      }
    )
  }
}
