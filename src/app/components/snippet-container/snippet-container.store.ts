import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { GistList } from '../../models/gists';
import { GistService } from '../../services/gist.service';

export interface SnippetContainerState {
    gists: GistList[];
}

@Injectable()
export class SnippetContainerStore extends ComponentStore<SnippetContainerState> {

    constructor(
        private gistService: GistService,
    ) {
        super({
            gists: [],
        });

        this.loadSnippets();
    }

    readonly gists$ = this.select((state) => state.gists);

    readonly setSnippets = this.updater((state, gists: GistList[]) => ({
        ...state,
        gists
    }));

    readonly toggleAll = this.updater((state, isChecked: boolean) => {
        return {
            ...state,
            gists: state.gists.map((gist) => ({ ...gist, selected: isChecked })),
        };
    });

    readonly loadSnippets = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() => {
                return this.gistService.getList().pipe(
                    tap((gists) => this.setSnippets(gists)),
                );
            })
        )
    );

    readonly saveSnippet = this.effect((snippet$: Observable<{ code: string, name: string, language: string }>) =>
        snippet$.pipe(
            switchMap(({ code, name, language }) => {
                return this.gistService.createGist(code, name, language).pipe(
                    tap((newSnippet) => this.setSnippets([...this.get().gists, newSnippet]))
                );
            })
        )
    );
}