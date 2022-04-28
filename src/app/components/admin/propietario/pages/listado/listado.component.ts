import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioService } from 'src/app/services/propietarioservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  title:String="Propietarios"
  propietarios: Propietario[];
  paginador_padre: any;
  componente_name:String;

  // departamentos: Departamento[]; 
  // departamentoSeleccionado: Departamento;
  // paginador_padre: any;
  // componente_name:String;

  constructor(private propietarioService: PropietarioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(">>>>>>>>>>>>Entro al componente de Listado de Propietario")
    this.listarPropietarios()
  }
  listarPropietarios() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0; 
      }
      this.propietarioService.getPropietarios(page)
        .subscribe(response => {
          console.log(response)
          console.log(response.detalle.data.contenido)
          this.propietarios = response.detalle.data.contenido as Propietario[];
          this.paginador_padre = response.detalle.data;
          console.log(response.detalle.data)
          this.componente_name="propietario"
        });

    });
  }

  public changeActivePropietario(propietario: Propietario): void {
    let tipoObjeto:String="propietario"
    Swal.fire({
      title: propietario.persona.estado? `Está seguro que desea DESACTIVAR al ${tipoObjeto}?`:`Está seguro que desea ACTIVAR al ${tipoObjeto}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.propietarioService.changeActive(propietario).subscribe(
          (response) => {
            Swal.fire(response.detalle.mensaje, '', 'success')
            this.listarPropietarios()
          }
        )
      } else if (result.isDenied) {

      }
    })
  }

}
 