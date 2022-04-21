import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropietarioDTO } from 'src/app/dto/PropietarioDTO';
import { PropietarioService } from 'src/app/services/propietarioservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  titulo:String="Crear Propietario"
  propietarioDTO:PropietarioDTO=new PropietarioDTO()
  constructor(private propietarioService:PropietarioService,private router: Router, private activatedRoute: ActivatedRoute) { }

  myFilter = (d: Date | null): boolean => {
   
    // Prevent Saturday and Sunday from being selected.
    return d <=new Date();
  };

  ngOnInit(): void {
  }

  create(){
    console.log("Clicked!")
    console.log(this.propietarioDTO)
    this.propietarioDTO.password="1234"
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
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `Error al registrar al propietario - ${err.error.detalle.mensaje}`,
            showConfirmButton: false
          })
          console.error(err.error)
        }
      )
  }

}
