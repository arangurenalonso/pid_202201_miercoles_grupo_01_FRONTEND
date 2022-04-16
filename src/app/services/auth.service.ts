import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  


  public urlEndPoint: string = environment.apiUrl;
  private _usuario: Usuario;
  private _token: string;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  public login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/api/auth/login?username=${usuario.username}&password=${usuario.password}`, usuario, { headers: this.httpHeaders });
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
  logOut(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
  public get usuario(): Usuario {
    console.log("Entro al metodo get de usuario")
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
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
  //Inyectamos la dependencia
  constructor(private http: HttpClient) {

  }
  public register(user: Usuario): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.urlEndPoint}/api/auth/register`, user);
  }


  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }
  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    console.log("Payload-"+payload)
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
}
