import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token-service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authTokenService = inject(AuthTokenService);
  const authToken = authTokenService.getAuthToken();
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
}