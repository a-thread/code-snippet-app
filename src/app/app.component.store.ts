import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { GistService } from './services/gist.service';
import { Router } from '@angular/router';
import { AccessToken } from './models/access-token';

export interface AppState {
    isAuthenticated: boolean;
    githubToken: string | null;
}

@Injectable()
export class AppStore extends ComponentStore<AppState> {
    constructor(
        private gistService: GistService,
        private router: Router,
    ) {
        super({
            isAuthenticated: !!sessionStorage.getItem('githubToken'),
            githubToken: sessionStorage.getItem('githubToken'),
        });
    }

    readonly isAuthenticated$ = this.select(state => state.isAuthenticated);
    readonly githubToken$ = this.select(state => state.githubToken);

    readonly setAuthentication = this.updater((state, githubToken: string | null) => {
        if (githubToken) {
            sessionStorage.setItem('githubToken', githubToken);
        } else {
            sessionStorage.removeItem('githubToken');
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

    readonly handleAuthentication = this.effect(() => {
        return this.isAuthenticated$.pipe(
            withLatestFrom(this.githubToken$),
            filter(([isAuthenticated, githubToken]) => isAuthenticated && githubToken !== null),
            tap(() => this.router.navigate(['/snippets']))
        );
    });
}