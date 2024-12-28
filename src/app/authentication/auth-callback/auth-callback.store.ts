import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, switchMap, tap } from 'rxjs/operators';
import { OAuthService } from '../oauth.service';
import { AuthTokenService } from '../auth-token-service';
import { Router } from '@angular/router';

export interface AuthCallbackState {
    isInErrorState: boolean;
}

@Injectable()
export class AuthCallbackStore extends ComponentStore<AuthCallbackState> {

    private oauthService = inject(OAuthService);
    private tokenService = inject(AuthTokenService);
    private router = inject(Router);

    constructor() {
        super({ isInErrorState: false });
    }

    readonly isInErrorState$ = this.select(state => state.isInErrorState);

    readonly retryLogin = this.effect<void>((trigger$) =>
        trigger$.pipe(
            tap(() => this.oauthService.loginWithGitHub()),
        )
    );

    readonly authenticateUser = this.effect<string>((authCode$) =>
        authCode$.pipe(
            switchMap((authCode: string) =>
                this.oauthService.validateCallback(authCode).pipe(
                    tap((response) => {
                        if (response?.access_token) {
                            this.tokenService.setAuthToken(response.access_token);
                            this.patchState({ isInErrorState: false });
                        } else {
                            this.tokenService.removeAuthToken();
                            this.patchState({ isInErrorState: true });
                        }
                    }),
                    filter((response) => !!response?.access_token),
                    tap(() => this.router.navigate([''])),
                )
            ),
        )
    );
}