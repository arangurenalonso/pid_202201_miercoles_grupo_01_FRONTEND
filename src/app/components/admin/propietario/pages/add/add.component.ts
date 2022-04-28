import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropietarioDTO } from 'src/app/dto/PropietarioDTO';
import { Respuesta } from 'src/app/dto/Respuesta';
import { Departamento } from 'src/app/model/departamento';
import { PropietarioDepartamento } from 'src/app/model/propietarioDepartamento';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { PropietarioService } from 'src/app/services/propietarioservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  titulo: String = "Crear Propietario"
  propietarioDTO: PropietarioDTO = new PropietarioDTO()
  departamentos: Departamento[];
  departamentosSeleccionados: Departamento[] = [];
  public errores: any
  constructor(private departamentoService: DepartamentoService,
    private propietarioService: PropietarioService, private router: Router, private activatedRoute: ActivatedRoute) { }

  myFilter = (d: Date | null): boolean => {

    // Prevent Saturday and Sunday from being selected.
    return d <= new Date();
  };

  ngOnInit(): void {
    this.listarDepartamentos()
  }

  listarDepartamentos() {
    this.departamentoService.getAllDepartamento()
      .subscribe(response => {
        console.log(">>>>>>>>>>>OBtener todos los departamentos")
        console.log(response)
        this.departamentos = response as Departamento[];
      });
  }
  agregarDepartamento(dep: Departamento) {
    this.departamentosSeleccionados.push(dep)
    this.departamentos = this.departamentos.filter(x => x.id != dep.id)
    this.departamentosSeleccionados.sort((x, y) => x.id - y.id)
  }
  desAgregarDepartamento(dep: Departamento) {
    this.departamentos.push(dep)
    this.departamentosSeleccionados = this.departamentosSeleccionados.filter(x => x.id != dep.id)
    this.departamentos.sort((x, y) => x.id - y.id)
  }
  create() {
    this.propietarioDTO.password = "1234"
    this.propietarioDTO.departamentos = this.departamentosSeleccionados
    this.propietarioService.create(this.propietarioDTO)
      .subscribe(response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `Propietario ${response.detalle.data.persona.nombre} ${response.detalle.data.persona.apellido}; fue creado de forma exitosa`,
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/propietario/listado'])
      },
        err => {
          let respuesta: Respuesta = err.error
          this.errores = respuesta.detalle.data
        }
      )
  }

}
