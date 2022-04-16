import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notificationService';
import { Usuario } from 'src/app/model/usuarios';
import { NotificationType } from 'src/app/enum/notification-type.enum';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService) {
    this.usuario = new Usuario()
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/admin/departamneto/listado');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(): void {
    console.log(this.usuario)
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.showLoading = true;
    this.authService.login(this.usuario).subscribe(
      response => {
        console.log(response)
        console.log(response)
        let objPayload = JSON.parse(atob(response.tokens.access_token.split(".")[1]))
        console.log("roles-" + objPayload.roles)
        console.log("username-" + objPayload.iss)
        console.log("tiempo de expiracion-" + new Date(objPayload.iat * 1000))
        console.log("tiempo de expiracion-" + new Date(objPayload.exp * 1000))
        let _usuario = (response.usuario as Usuario);
        this.authService.guardarUsuario(_usuario);
        this.authService.guardarToken(response.tokens.access_token);
        this.notificationService.notify('success', 'Notification successfully opened.' )
        swal.fire('Login', `Hola ${this.authService.usuario.persona.nombre}, has iniciado sesión con éxito!`, 'success');
        this.showLoading = false;
        this.router.navigateByUrl('/admin/departamneto/listado');
      },
      err => {
          if(err.status==400){
            console.log(err)
            this.sendErrorNotification(NotificationType.ERROR, err.error.detalle.mensaje)
            swal.fire('Login',err.error.detalle.mensaje, 'error');
            this.showLoading = false;
          }
      })
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
