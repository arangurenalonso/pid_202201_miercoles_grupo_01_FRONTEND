import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

//Inyectamos la dependencia
constructor(private http: HttpClient,private router: Router) {

}



  public urlEndPoint: string = environment.apiUrl;
  private _usuario: Usuario;
  private _token: string;

  public get usuario(): Usuario {
    console.log("Entro al metodo get de usuario ")
    if (this._usuario != null) {
      console.log("Se obtiene de la variable")
      console.log(this._usuario)
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      console.log("Se obtiene de storage")
      console.log(this._usuario)
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    
    return new Usuario();
  }

  public get token(): string {
    console.log("Entro al metodo get del token")
    if (this._token != null) {
      console.log("Devuelvo el token desde la memoria")
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      console.log("Devuelvo el token desde el session storage")
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  public login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/api/auth/login?username=${usuario.email}&password=${usuario.password}`, usuario);
  }
  logOut(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
  public register(user: Usuario): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.urlEndPoint}/api/auth/register`, user);
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }
  guardarUsuario(usuario: Usuario): void {
    this._usuario = usuario
    this._usuario.lastLoginDate = new Date(usuario.lastLoginDate)
    this._usuario.lastLoginDateDisplay = new Date(usuario.lastLoginDateDisplay)
    this._usuario.password = "*******************"
    console.log(this._usuario)
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    console.log("Entro a Is Authenticated Payload")
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.iss && payload.iss.length > 0) {
      console.log("Usuario authenticado")
      return true;
    }
    console.log("Usuario NO authenticado")
    return false;
  }
  hasRole(role: string): boolean {
    let isHasRol:boolean=false
    this.usuario.permiso.forEach(permiso => {
      if (permiso.role.name==role) {
        console.log("Usuario tiene el rol")
        isHasRol=true;
      }
    });
    console.log("Usuario NO tiene el rol")
    return isHasRol;
  }

  public agregarAuthorizationHeader(cabecera:HttpHeaders) {
    console.log("Entro a agregar AuthorizaciònHeader")
    let token = this.token;
    if (token != null) {
      console.log( 'Bearer ' + token)
      console.log(cabecera)
      return cabecera.append('Authorization', 'Bearer ' + token);
    }
    return cabecera;
  }

  public isNoAutorizado(e): boolean {
    console.log("---Entro al metodo isNoAutorizado")
    if (e.status == 401) {
      if (this.isAuthenticated()) {
        this.logOut();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      Swal.fire('Acceso denegado', `El usuario ${this.usuario.email} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
}
