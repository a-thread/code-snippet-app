import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, AppStore } from '../../app.component.store';
import { OAuthService } from '../../services/oauth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GistService } from '../../services/gist.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [
    AppStore,
    OAuthService,
    GistService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  appState$: Observable<AppState>;

  constructor(
    private appStore: AppStore,
    private oAthService: OAuthService,
  ) {
    this.appState$ = this.appStore.state$;
  }


  ngOnInit(): void {
    this.appStore.handleAuthentication();
  }

  loginWithGitHub(): void {
    this.oAthService.loginWithGitHub();
  }
}