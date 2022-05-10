import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { Usuario } from 'src/app/model/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public userConected:Usuario;

  constructor(private authService: AuthService, private router: Router, private fileService:FileService) { }
  ngOnInit(): void {
    console.log("INICIALIZO EL COMPONENTE de usuario")
    
    
    this.userConected=this.authService.usuario
    this.escucharCargaDeFoto()
  }
  escucharCargaDeFoto(){
    
    this.fileService.notificarUploadFoto.subscribe((response)=>{
      console.log("Escucha la Notificación de Upload Foto")
      let userConected=this.authService.usuario
      let personaActualizad=response.detalle.data 
      if(this.userConected.id==personaActualizad.usuario.id){
        userConected.foto=personaActualizad.usuario.foto
        this.userConected=userConected
        this.authService.guardarUsuario(userConected);
      }
    
    })
  }

  logout(): void {
    let username = this.authService.usuario.email;
    this.authService.logOut();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

 

}
//- File > Preferences > Settings. On macOS - Code > Preferences > Settings. 