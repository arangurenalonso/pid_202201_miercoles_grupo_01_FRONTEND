
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { FamiliarDTO } from "../dto/FamiliarDTO";
import { Familiar } from "../model/familiar";


@Injectable({
    providedIn: 'root'
})
export class FamiliarService {
    public urlEndPoint: string = environment.apiUrl + "/api/familiar";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    
    create(familiar: FamiliarDTO, idPropietario:number): Observable<any> {
      console.log(familiar)
      let usuarioConectado = this.authService.usuario
      familiar.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint+`/${idPropietario}`, familiar, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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

    actualizar(familiar: FamiliarDTO, idPropietario:number): Observable<any> {
      let usuarioConectado = this.authService.usuario
      familiar.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint+`/actualizar`, familiar, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
    changeActive(familiar: Familiar): Observable<any> {

      return this.http.delete(this.urlEndPoint+`/changeActive/${familiar.id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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