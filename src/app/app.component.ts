import { Component } from '@angular/core';
import { AppStore } from './app.component.store'; // Import the AppStore
import { OAuthService } from './services/oauth-service.service';
import { GistService } from './services/gist.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
  ],
  providers: [
    AppStore,
    OAuthService,
    GistService
  ]
})
export class AppComponent { }