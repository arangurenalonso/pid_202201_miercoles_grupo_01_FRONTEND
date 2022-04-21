import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitanteDTO } from 'src/app/dto/VisitanteDTO';
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
  public errores: string[]
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
        // this.departamentoService.getDepartamento(id).subscribe(
        //   response=>{
        //     console.log(response)
        //     this.departamento=response
        //     (clienteObtenido) => this.departamento = clienteObtenido
        //   })
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
          // this.errores = err.error.errors as string[]
          swal.fire({
            position: 'center',
            icon: 'error',
            title: `Error al registrar al visitante - ${err.error.detalle.mensaje}`,
            showConfirmButton: false
          })
          console.error(err)

        }
      )
  }
  
  public update(): void {
    // this.departamentoService.update(this.departamento).subscribe(
    //   response => {
    //     this.router.navigate(['/admin/departamentos/listado'])
    //     swal.fire({

    //       position: 'center',
    //       icon: 'success',
    //       title: `${response.reason} -> Id: Departamento ${response.detalle.data.id}`,
    //       showConfirmButton: false,
    //       timer: 2500
    //     })

    //   },
    //   err => {
    //     this.errores = err.error.errors as string[]
    //     console.error(err)
    //     console.error("Codigo del error desde el backend" + err.status)
    //     console.error(err.error)
    //   }
    // )
  }
}
