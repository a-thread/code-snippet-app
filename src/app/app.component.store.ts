import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { GistService } from './services/gist.service';
import { Router } from '@angular/router';
import { AccessToken } from './models/access-token';
import { GithubTokenService } from './services/github-token.service';

export interface AppState {
    isAuthenticated: boolean;
    githubToken: string | null;
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
    constructor(
        private gistService: GistService,
        private githubTokenService: GithubTokenService,
        private router: Router,
    ) {
        super({
            isAuthenticated: !!githubTokenService.getGithubToken(),
            githubToken: githubTokenService.getGithubToken(),
        });
    }

    readonly isAuthenticated$ = this.select(state => state.isAuthenticated);
    readonly githubToken$ = this.select(state => state.githubToken);

    readonly setAuthentication = this.updater((state, githubToken: string | null) => {
        if (githubToken) {
            this.githubTokenService.setGithubToken(githubToken);
        } else {
            this.githubTokenService.removeGithubToken();
        }
        return {
            ...state,
            isAuthenticated: !!githubToken,
            githubToken
        };
    });

    readonly authenticateUser = this.effect((authCode$: Observable<string>) =>
        authCode$.pipe(
            switchMap((authCode: string) => this.gistService.getAccessToken(authCode)),
            tap((response: AccessToken) => this.setAuthentication(response.access_token)),
            tap(() => this.router.navigate(['/snippets'])),
        )
    );

    readonly handleAuthentication = this.effect<void>((trigger$) => {
        return trigger$.pipe(
            withLatestFrom(this.state$),
            filter(([trigger, state]) => state.isAuthenticated && state.githubToken !== null),
            tap(() => this.router.navigate(['/snippets']))
        );
    });
}