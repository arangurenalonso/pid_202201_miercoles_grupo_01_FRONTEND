
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { MascotaDTO } from "../dto/MascotaDTO";


@Injectable({
    providedIn: 'root'
})
export class MascotaService {
    public urlEndPoint: string = environment.apiUrl + "/api/mascota";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    create(mascota: MascotaDTO, idPropietario:number): Observable<any> {
      console.log(mascota)
       
      let usuarioConectado = this.authService.usuario
      mascota.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint+`/${idPropietario}`, mascota,{ headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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