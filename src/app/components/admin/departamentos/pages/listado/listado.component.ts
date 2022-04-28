import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/model/departamento';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  
  departamentos: Departamento[];  
  paginador_padre: any;
  componente_name:String;
  departamentoSeleccionado: Departamento;

  
  constructor(
    private departamentoService: DepartamentoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(">>>>>>>>>>>>Entro al componente de Listado de Departamente")
    this.listarDepartamentos()

  }
  listarDepartamentos() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      } 
      this.departamentoService.getDepartamentos(page)
        .subscribe(response => {
          console.log("+Devolucion de la respuesta de la busqueda de departamento")
          this.departamentos = response.contenido as Departamento[];
          this.paginador_padre = response;
          this.componente_name="departamentos"
        });
 
    });
  }
 

  delete(departamento: Departamento): void {
    Swal.fire({
      title: `Está seguro de eliminar el departamento ${departamento.depnumero}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.departamentoService.delete(departamento.id).subscribe(
          () => {
            Swal.fire('Departamento Eliminado con exito!', '', 'success')
            this.listarDepartamentos()
          }
        )
      } else if (result.isDenied) {
        Swal.fire(`Departamento ${departamento.depnumero} no fue eliminado`, '', 'info')
      }
    })
  }
  public changeActiveDepartamento(departamento: Departamento): void {
    let tipoObjeto:String="Departamento"
    Swal.fire({
      title: departamento.estado? `Está seguro que desea DESACTIVAR el ${tipoObjeto}?`:`Está seguro que desea ACTIVAR el ${tipoObjeto}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.departamentoService.changeActive(departamento).subscribe(
          (response) => {
            Swal.fire(response.detalle.mensaje, '', 'success')
            this.listarDepartamentos()
          }
        )
      } else if (result.isDenied) {

      }
    })
  }
}
