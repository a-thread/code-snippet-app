import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { GistListComponent } from './components/gist-list/gist-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './authentication/auth.guard';
import { GistDetailComponent } from './components/gist-detail/gist-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'callback', component: AuthCallbackComponent },
  {
    path: '', component: GistListComponent, canActivate: [authGuard], pathMatch: 'full'
  },
  {
    path: ':id',
    component: GistDetailComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' },
];
