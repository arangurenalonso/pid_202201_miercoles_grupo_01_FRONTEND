
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { catchError, Observable, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FileService {
    public urlEndPoint: string = environment.apiUrl + "/api/uploads";
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


    subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

        let formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("id", id);
        let httpHeaders = new HttpHeaders();
        let token = this.authService.token;
        if (token != null) {
          httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
        }
        const req = new HttpRequest(
            'POST',
            `${this.urlEndPoint}/foto/upload`,
            formData,
            {
                reportProgress: true,
                headers: httpHeaders//this.authService.agregarAuthorizationHeader(this.httpHeaders)
            }
        );

        return this.http.request(req)
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

