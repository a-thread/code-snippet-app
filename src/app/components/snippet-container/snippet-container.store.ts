import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { Gist } from '../../models/gists';
import { GistService } from '../../services/gist.service';
import { GistTableVm } from './gist-table/gist-table-vm';

export interface SnippetContainerState {
    gists: Gist[];
    sortColumn: keyof Gist | null;
    sortOrder: 'asc' | 'desc';
}

@Injectable()
export class SnippetContainerStore extends ComponentStore<SnippetContainerState> {

    constructor(
        private gistService: GistService,
    ) {
        super({
            gists: [],
            sortColumn: null,
            sortOrder: 'asc',
        });

        this.loadSnippets();
    }

    readonly sortedGists$ = this.select(({ gists, sortColumn, sortOrder }) => {
        if (!sortColumn) return gists;

        return [...gists].sort((a, b) => {
            const valueA = a[sortColumn] || '';
            const valueB = b[sortColumn] || '';

            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    });

    viewModel$ = this.select(this.sortedGists$, this.state$, (gists, state): GistTableVm => ({ ...state, sortedGists: gists }));

    readonly setSnippets = this.updater((state, gists: Gist[]) => ({
        ...state,
        gists
    }));

    readonly toggleAll = this.updater((state, event: Event) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        return {
            ...state,
            gists: state.gists.map((gist) => ({ ...gist, selected: isChecked })),
        };
    });

    readonly sort = this.updater((state, column: keyof Gist) => {
        const isSameColumn = state.sortColumn === column;
        return {
            ...state,
            sortColumn: column,
            sortOrder: isSameColumn ? (state.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc',
        };
    });

    readonly loadSnippets = this.effect<void>(trigger$ =>
        trigger$.pipe(
            switchMap(() => {
                return this.gistService.getGists().pipe(
                    tap((gists) => this.setSnippets(gists)),
                );
            })
        )
    );

    readonly deleteGist = this.effect<string>((id$) =>
        id$.pipe(
            switchMap(([id]) => {
                return this.gistService.deleteGist(id).pipe(
                    tap(() => this.setSnippets(this.get().gists.filter(gist => gist.id !== id)))
                );
            })
        )
    );

    readonly saveSnippet = this.effect((snippet$: Observable<{ code: string, notes: string, language: string }>) =>
        snippet$.pipe(
            switchMap(({ code, notes, language }) => {
                return this.gistService.createGist(code, notes, language).pipe(
                    tap((newSnippet) => this.setSnippets([...this.get().gists, newSnippet]))
                );
            })
        )
    );
}