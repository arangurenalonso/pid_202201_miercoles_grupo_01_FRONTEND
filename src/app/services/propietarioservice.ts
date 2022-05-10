
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Propietario } from "../model/propietario";
import { PropietarioDTO } from "../dto/PropietarioDTO";


@Injectable({
  providedIn: 'root'
})
export class PropietarioService {
  public urlEndPoint: string = environment.apiUrl + "/api/propietario";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  private isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logOut();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.email} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
  getPropietarios(page: number): Observable<any> {
    console.log("+Entro al metodo de obtener Propietarios")
    return this.http.get(this.urlEndPoint + `?numeroDePagina=${page}`, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    ); 
  }
  create(propietarioDTO: PropietarioDTO): Observable<any> {
    let usuarioConectado = this.authService.usuario
    propietarioDTO.idPersonaRegistro = usuarioConectado.persona.id
    return this.http.post(this.urlEndPoint, propietarioDTO, { headers: this.agregarAuthorizationHeader() })
      .pipe(
        catchError(e => {
          if (this.authService.isNoAutorizado(e)) {
            //this.router.navigate(['/admin/departamneto/listado']);
            return throwError(e);
          }
          Swal.fire({
  
            position: 'center',
            
            title: `${e.error.reason} `,
            icon: 'error',
            text: `${e.error.detalle.mensaje} `,
            showConfirmButton: false,
            timer: 2500
          })
          console.log(e)
          return throwError(e);
        })
      );
  }

  findPropietarioByID(id): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        this.router.navigate(['/admin/propietario/listado']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  changeActive(propietario: Propietario): Observable<any> {

    return this.http.delete(this.urlEndPoint+`/changeActive/${propietario.id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

      .pipe(
       
        catchError(e => {
          if (this.authService.isNoAutorizado(e)) {
            return throwError(e);
          }
          Swal.fire({

            position: 'center',
            
            title: `${e.error.reason} `,
            icon: 'error',
            text: `${e.error.detalle.mensaje} `,
            showConfirmButton: false,
            timer: 2500
          })
          return throwError(e);
        })
      );
  }

  getAllPropietarios(): Observable<any> {
    return this.http.get(this.urlEndPoint + `/all`, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    ); 
  }

  buscarDepartamentoXPropietario(prop:Propietario): Observable<any> {
    return this.http.post(this.urlEndPoint + `/buscarDepartamentos`,prop, { headers: this.agregarAuthorizationHeader() })
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    ); 
  }
}