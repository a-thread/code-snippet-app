import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessToken } from '../shared/models/access-token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  private clientId = environment.githubClientId;
  private redirectUri = environment.githubRedirectUri;
  private backendUrl = `${environment.authApiUrl}/api/authenticate`;

  constructor(private http: HttpClient) { }

  public loginWithGitHub(): void {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=read:user,gist`;
    window.location.href = githubAuthUrl;
  }

  validateCallback(authCode: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.backendUrl, { code: authCode });
  }
}
