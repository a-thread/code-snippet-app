import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthTokenService } from './auth-token-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authTokenService = inject(AuthTokenService);
  const isAuthenticated = authTokenService.isAuthenticated();
  return isAuthenticated || router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};