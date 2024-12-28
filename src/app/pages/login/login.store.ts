import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthTokenService } from '../../authentication/auth-token-service';
import { OAuthService } from '../../authentication/oauth.service';

@Injectable()
export class LoginStore extends ComponentStore<{}> {
    constructor(
        private authTokenService: AuthTokenService,
        private router: Router,
        private oauthService: OAuthService,
    ) {
        super({});
    }

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