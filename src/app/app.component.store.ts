import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccessToken } from './models/access-token';
import { AuthTokenService } from './authentication/auth-token-service';
import { OAuthService } from './authentication/oauth.service';

@Injectable()
export class AppStore extends ComponentStore<{}> {
    constructor(
        private authTokenService: AuthTokenService,
        private router: Router,
        private oauthService: OAuthService,
    ) {
        super({});
    }

    readonly authenticateUser = this.effect<string>((authCode$) =>
        authCode$.pipe(
            switchMap((authCode: string) => this.oauthService.validateCallback(authCode)),
            tap((response: AccessToken) => {
                if (response?.access_token) {
                    this.authTokenService.setAuthToken(response.access_token);
                } else {
                    this.authTokenService.removeAuthToken();
                }
            }),
            tap(() => this.router.navigate([''])),
        )
    );

    readonly handleAuthentication = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            tap(() => {
                if (this.authTokenService.isAuthenticated()) {
                    this.router.navigate(['']);
                } else {
                    this.oauthService.loginWithGitHub();
                }
            })
        );
    });
}