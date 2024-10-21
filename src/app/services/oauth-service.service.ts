import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  private clientId = environment.githubClientId;
  private redirectUri = environment.githubRedirectUri;

  constructor() {}

  public loginWithGitHub(): void {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=read:user,gist`;
    window.location.href = githubAuthUrl;
  }
}
