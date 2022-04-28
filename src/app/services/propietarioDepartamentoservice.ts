import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { DepartamentoDTO } from '../dto/departamentoDTO';
import { Departamento } from '../model/departamento';
import { PropietarioDepartamentoDTO } from '../dto/PropietarioDepartamentoDTO';
//import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({ 
  providedIn: 'root'
})
export class PropietarioDepartamentoService {

  public urlEndPoint: string = environment.apiUrl + "/api/propietariodepartamneto";
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  //Inyectamos la dependencia
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService) { }

 
  actualizarDepartamentosPropietario(propietario_id: number, propietarioDepartamentoDTO:PropietarioDepartamentoDTO): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/${propietario_id}`,propietarioDepartamentoDTO, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) }).pipe(
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

}