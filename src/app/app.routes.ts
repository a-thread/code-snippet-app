import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { SnippetContainerComponent } from './components/snippet-container/snippet-container.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'callback', component: AuthCallbackComponent },
  { path: 'snippets', component: SnippetContainerComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'snippets', pathMatch: 'full' },
  { path: '*', redirectTo: 'login' },
];
