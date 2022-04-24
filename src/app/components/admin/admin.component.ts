import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public userConected:Usuario;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    console.log("INICIALIZO EL COMPONENTE de usuario")
    this.userConected=this.authService.usuario
  }


  logout(): void {
    let username = this.authService.usuario.email;
    this.authService.logOut();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

 

}
//- File > Preferences > Settings. On macOS - Code > Preferences > Settings. 