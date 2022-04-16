import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authService.urlEndPoint}/api/auth/iniciarSesion`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authService.urlEndPoint}/api/auth/register`)) {
      return httpHandler.handle(httpRequest);
    }
    const token = this.authService.token;
    const request = httpRequest.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    return httpHandler.handle(request);
  }
}
