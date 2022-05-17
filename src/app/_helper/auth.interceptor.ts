import { TokenStorageService } from './../_services/token-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
const TOKEN_HEADER_KEY = 'hseEzY2spBO6HmNcrErBpxTiidRVBaV0Db2mAeIVKT78KVFsBUshxHgPGopjTptL';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const token = this.token.getToken();
    if (token != null) {
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
