
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { Propietario } from "../model/propietario";
import { Mascota } from "../model/Mascota";
import { Familiar } from "../model/familiar";
import { PropietarioDTO } from "../dto/PropietarioDTO";
import { FamiliarDTO } from "../dto/FamiliarDTO";


@Injectable({
    providedIn: 'root'
})
export class FamiliarService {
    public urlEndPoint: string = environment.apiUrl + "/api/familiar";
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
    create(familiar: FamiliarDTO, idPropietario:number): Observable<any> {
      console.log(familiar)
      return this.http.post(this.urlEndPoint+`/${idPropietario}`, familiar, { headers: this.agregarAuthorizationHeader() })
        .pipe(
         
          catchError(e => {
            if (this.isNoAutorizado(e)) {
              return throwError(e);
            }
  
            if (e.status == 400) {
              return throwError(e);
            }
  
            console.error(e.error.mensaje);
            Swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
    }


}