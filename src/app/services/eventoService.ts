
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { EventoIncidenteDTO } from "../dto/EventoIncidenteDTO";


@Injectable({
    providedIn: 'root'
})
export class EventoService {
    public urlEndPoint: string = environment.apiUrl + "/api/eventoIncidente";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


    paginacion(filtroURL:string): Observable<any> {
      return this.http.get(this.urlEndPoint+filtroURL , { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
    registrar(obj: EventoIncidenteDTO): Observable<any> {
      let usuarioConectado = this.authService.usuario
      obj.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint+`/registrar`, obj,{ headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

        .pipe(
         
          catchError(e => {
            if (this.authService.isNoAutorizado(e)) {
              return throwError(e);
            }
            
            console.log(e)
            return throwError(e);
          })
        );
    }
}