import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from 'src/app/model/departamento';
import { Visitante } from 'src/app/model/visitante';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { VisitanteService } from 'src/app/services/visitante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  visitantes: Visitante[];
  constructor(private visitanteService: VisitanteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarVisitante()

  }
  listarVisitante() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      this.visitanteService.listarTodo()
        .subscribe(response => {
          console.log(response)
          this.visitantes = response.detalle.data as Visitante[];
          // this.paginador_padre = response;
          // this.componente_name="departamentos"
          
        });

    });
  }

  public changeActiveVisitante(visitante: Visitante): void {
    let tipoObjeto:String="Visitante"
    Swal.fire({
      title: visitante.persona.estado? `Está seguro que desea DESACTIVAR al ${tipoObjeto}?`:`Está seguro que desea ACTIVAR al ${tipoObjeto}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.visitanteService.changeActive(visitante).subscribe(
          (response) => {
            Swal.fire(response.detalle.mensaje, '', 'success')
            this.listarVisitante()
          }
        )
      } else if (result.isDenied) {

      }
    })
  }
}
 