import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideServerRendering } from '@angular/platform-server';
import { authInterceptor } from './authentication/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([authInterceptor]), withInterceptorsFromDi(), withFetch())
  ]
};
