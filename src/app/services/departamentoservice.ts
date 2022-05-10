import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { DepartamentoDTO } from '../dto/departamentoDTO';
import { Departamento } from '../model/departamento';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ 
  providedIn: 'root'
})
export class DepartamentoService {

  public urlEndPoint: string = environment.apiUrl + "/api/departamento";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  //Inyectamos la dependencia
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getAllDepartamento(): Observable<any> { 
    return this.http.get(this.urlEndPoint + `/all`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
    .pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getDepartamentos(page: number): Observable<any> { 
    console.log("+Entro al metodo de obtener departamento")
    return this.http.get(this.urlEndPoint + `?numeroDePagina=${page}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
    .pipe(
      catchError(e => {
        this.authService.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getDepartamento(id): Observable<any> {
    return this.http.get<DepartamentoDTO>(`${this.urlEndPoint}/${id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) }).pipe(
      
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

  create(departamento: DepartamentoDTO): Observable<any> {
    console.log(departamento)
    let usuarioConectado = this.authService.usuario
    departamento.idPersonaRegistro = usuarioConectado.persona.id
    return this.http.post(this.urlEndPoint, departamento, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
          console.log(e)
          return throwError(e);
        })
       
      );
  }

  update(departamento: DepartamentoDTO): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${departamento.id}`, departamento, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) }).pipe(
      catchError(e => {

        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }


        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');

        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) }).pipe(
      catchError(e => {

        if (this.authService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  changeActive(departamento: Departamento): Observable<any> {

    return this.http.delete(this.urlEndPoint+`/changeActive/${departamento.id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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
}