import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { SnippetContainerStore } from '../snippet-container.store';
import { GistList } from '../../../models/gists';
import { GistTableVm } from './gist-table-vm';
import { switchMap, tap } from 'rxjs';
import { GistService } from '../../../services/gist.service';

export interface GistTableState {
    sortColumn: keyof GistList | null;
    sortOrder: 'asc' | 'desc';
}

@Injectable()
export class GistTableStore extends ComponentStore<GistTableState> {

    snippetContainerStore = inject(SnippetContainerStore);

    constructor(
        private gistService: GistService,

    ) {
        super({
            sortColumn: null,
            sortOrder: 'asc',
        });
    }

    readonly sortedGists$ = this.select(
        this.snippetContainerStore.gists$,
        this.state$,
        (gists, { sortColumn, sortOrder }) => {
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


    readonly sort = this.updater((state, column: keyof GistList) => {
        const isSameColumn = state.sortColumn === column;
        return {
            ...state,
            sortColumn: column,
            sortOrder: isSameColumn ? (state.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc',
        };
    });

    readonly deleteGist = this.effect<string>((id$) =>
        id$.pipe(
            switchMap(([id]) => this.gistService.deleteGist(id).pipe(
                tap(() => this.snippetContainerStore.loadSnippets())
            ))
        )
    );

    readonly toggleAll = (isChecked: boolean) => this.snippetContainerStore.toggleAll(isChecked);

}