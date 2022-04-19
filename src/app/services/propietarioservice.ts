
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { Propietario } from "../model/propietario";


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
    getPropietarios(page:number): Observable<any> {
        return this.http.get(this.urlEndPoint + `?numeroDePagina=${page}`, { headers: this.agregarAuthorizationHeader() }).pipe(
          catchError(e => {
            this.isNoAutorizado(e);
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


}