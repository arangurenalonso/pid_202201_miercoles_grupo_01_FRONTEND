
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { BoletaServicioDTO } from "../dto/BoletaServicioDTO";


@Injectable({
    providedIn: 'root'
})
export class BoletaServicioService {
    public urlEndPoint: string = environment.apiUrl + "/api/programacionPago";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    registrarPagos(boletaServicioDTO: BoletaServicioDTO): Observable<any> {
      return this.http.post(this.urlEndPoint+`/registrarPagos`, boletaServicioDTO,{ headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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

    obtenerPagosPendientes(id: number): Observable<any> {
      return this.http.get(this.urlEndPoint+`/PagosPendientes/${id}`, { headers: this.authService.agregarAuthorizationHeader(this.httpHeaders) })

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