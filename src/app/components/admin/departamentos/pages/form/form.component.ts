import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/model/departamento';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public departamento: Departamento = new Departamento()
  public titulo: String = "Crear Departamento"
  public errores: string[]
  /**
   * NGModel -> Realiza un binding an objeto asignado; es decir enlaza al objeto cliente y rellena los datos del formulario
   *            conforme se rellena los datos
   */
  constructor(private departamentoService: DepartamentoService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.departamentoService.getDepartamento(id).subscribe(
          response=>{
            console.log(response)
            this.departamento=response
            //(clienteObtenido) => this.departamento = clienteObtenido
          }
        )
        this.titulo = 'Editar Cliente'
      }
    })
  }
  public create(): void {
    console.log("Clicked!")
    console.log(this.departamento)
    this.departamento.estado=true
    console.log(this.departamento)
    this.departamentoService.create(this.departamento)
      .subscribe(response => {
        console.log("Departamento se cargo exitoso"+response)
        swal.fire({
          position: 'center',
          icon: 'success',
          title: `El Departmento  ${response.detalle.data.depnumero}; fue creado de forma exitosa`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/departamneto/listado'])
      },
        err => {
          this.errores = err.error.errors as string[]
          console.error(err)
          console.error("Codigo del error desde el backend" + err.status)
          console.error(err.error)
        }
      )
  }
  
  public update(): void {
    this.departamentoService.update(this.departamento).subscribe(
      response => {
        this.router.navigate(['/admin/departamneto/listado'])
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
