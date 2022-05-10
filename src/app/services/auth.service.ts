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
    console.log("<<<< Obtener Usuario Conectado >>>>")
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    
    return new Usuario();
  }

  public get token(): string {
    console.log("<<<< Obtener Token >>>>")
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
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
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    console.log("<<<<  Metodo Is Authenticated >>>>")
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.iss && payload.iss.length > 0) {
      return true;
    }
    return false;
  }
  hasRole(role: string): boolean {
    console.log("<<<<  Metodo Has Role >>>>")
    let isHasRol:boolean=false
    this.usuario.permiso.forEach(permiso => {
      if (permiso.role.name==role) {
        isHasRol=true;
      }
    });
    return isHasRol;
  }

  public agregarAuthorizationHeader(cabecera:HttpHeaders) {
    console.log("<<< Entro a agregar AuthorizaciònHeader >>>")
    let token = this.token;
    if (token != null) {
      return cabecera.append('Authorization', 'Bearer ' + token);
    }
    return cabecera;
  }

  public isNoAutorizado(e): boolean {
    
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
