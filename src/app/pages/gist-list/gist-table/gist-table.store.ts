import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { GistList } from '../../../models/gists';
import { GistTableVm } from './gist-table-vm';
import { switchMap, tap } from 'rxjs';
import { GistService } from '../../../shared/services/gist.service';
import { ToastService } from '../../../toast/toast.service';
import { ToastType } from '../../../models/toast-message';

export interface GistTableState {
    gists: GistList[];
    sortColumn: keyof GistList | null;
    sortOrder: 'asc' | 'desc';
}

@Injectable()
export class GistTableStore extends ComponentStore<GistTableState> {

    gistService = inject(GistService);
    toastService = inject(ToastService);

    constructor() {
        super({
            gists: [],
            sortColumn: null,
            sortOrder: 'asc',
        });

        this.loadSnippets();
    }

    readonly gists$ = this.select((state) => state.gists);


    readonly sortedGists$ = this.select(
        this.gists$,
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
    readonly sort = this.updater((state, column: keyof GistList) => {
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
                return this.gistService.getList().pipe(
                    tap((gists) => this.setSnippets(gists)),
                );
            })
        )
    );

    readonly deleteGist = this.effect<string>((id$) =>
        id$.pipe(
            switchMap((id) => this.gistService.delete(id).pipe(
                tap({
                    next: () => {
                        this.setSnippets(this.get().gists.filter((gist) => gist.id !== id));
                        this.toastService.showToast('Gist deleted successfully!');
                    },
                    error: (error) => {
                        this.toastService.showToast('Failed to delete gist', ToastType.Error);
                    },
                })
            ))
        )
    );
}