
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { MascotaDTO } from "../dto/MascotaDTO";
import { Mascota } from "../model/Mascota";
import { VisitaDTO } from "../dto/VisitaDTO";


@Injectable({
    providedIn: 'root'
})
export class VisitaService {
    public urlEndPoint: string = environment.apiUrl + "/api/visita";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    registrar(visita: VisitaDTO): Observable<any> {
       
      let usuarioConectado = this.authService.usuario
      visita.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint+`/registrar`, visita,{ headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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

    listarConFiltro(filtroURL:string): Observable<any> {
       
     
      return this.http.get(this.urlEndPoint+`${filtroURL}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })
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
}