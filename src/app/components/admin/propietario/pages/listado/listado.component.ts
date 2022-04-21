import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioService } from 'src/app/services/propietarioservice';

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

  constructor(private propietarioService: PropietarioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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
          console.log(this.propietarios)
          this.paginador_padre = response;
          this.componente_name="propietario"
          
        });

    });
  }
}
 