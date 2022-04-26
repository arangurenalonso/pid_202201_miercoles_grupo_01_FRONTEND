
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { VisitanteDTO } from "../dto/VisitanteDTO";


@Injectable({
    providedIn: 'root'
})
export class VisitanteService {
    public urlEndPoint: string = environment.apiUrl + "/api/visitante";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    create(visitante: VisitanteDTO): Observable<any> {
      let usuarioConectado = this.authService.usuario
      visitante.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint, visitante,{ headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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

    listarTodo(): Observable<any> {
      return this.http.get(this.urlEndPoint , { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
      .pipe(
        catchError(e => {
          if (this.authService.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      ); 
    }

}