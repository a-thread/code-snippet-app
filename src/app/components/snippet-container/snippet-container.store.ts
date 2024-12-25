import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Snippet } from '../../models/snippet';
import { GistService } from '../../services/gist.service';
import { Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import { Gist } from '../../models/gists';

export interface SnippetContainerState {
    gists: Gist[];
    selectedGist: Gist | null;
    githubToken: string | null;
}

@Injectable()
export class SnippetContainerStore extends ComponentStore<SnippetContainerState> {

    constructor(
        private gistService: GistService,
    ) {
        super({
            gists: [],
            selectedGist: null,
            githubToken: null,
        });
    }

    readonly gists$ = this.select(state => state.gists);
    readonly selectedGist$ = this.select(state => state.selectedGist);
    readonly githubToken$ = this.select(state => state.githubToken);

    readonly setSnippets = this.updater((state, gists: Gist[]) => ({
        ...state,
        gists
    }));

    readonly setToken = this.updater((state, token: string) => ({
        ...state,
        githubToken: token,
    }));

    readonly loadSnippets = this.effect((githubToken$: Observable<string | null>) =>
        githubToken$.pipe(
            switchMap((githubToken) => {
                console.log(githubToken)
                if (!githubToken) {
                    return [];
                }
                return this.gistService.getGists(githubToken).pipe(
                    tap((gists) => this.setSnippets(gists)),
                    tap(() => this.setToken(githubToken))
                );
            })
        )
    );

    readonly saveSnippet = this.effect((snippet$: Observable<{ code: string, notes: string, language: string }>) =>
        snippet$.pipe(
            withLatestFrom(this.githubToken$),
            switchMap(([{ code, notes, language }, token]) => {
                if (!token) {
                    throw new Error('Not authenticated');
                }
                return this.gistService.createGist(code, notes, language, token).pipe(
                    tap((newSnippet) => this.setSnippets([...this.get().gists, newSnippet]))
                );
            })
        )
    );
}