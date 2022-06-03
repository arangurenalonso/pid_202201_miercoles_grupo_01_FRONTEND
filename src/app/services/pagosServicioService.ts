
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { ProgramacionPagosDTO } from "../dto/ProgramacionPagosDTO";
import { CancelarPagoDTO } from "../dto/CancelarPagoDTO";


@Injectable({
    providedIn: 'root'
})
export class PagosServicioService {
    public urlEndPoint: string = environment.apiUrl + "/api/pagoServicio";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    cancelarServicios(CancelarPagoDTO: CancelarPagoDTO): Observable<any> {
      let usuarioConectado = this.authService.usuario
      CancelarPagoDTO.idPersonaRegistro = usuarioConectado.persona.id
      return this.http.post(this.urlEndPoint+`/cancelar`, CancelarPagoDTO,{ headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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