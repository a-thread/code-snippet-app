import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { GistList } from '../../../shared/models/gist-list';
import { switchMap, tap } from 'rxjs';
import { GistService } from '../../../shared/services/gist.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ToastType } from 'src/app/shared/models/toast-message';

export interface GistTableState {
    isLoading: boolean;
    gists: GistList[];
    pageSize: number;
    currentPage: number;
}

@Injectable()
export class GistTableStore extends ComponentStore<GistTableState> {

    gistService = inject(GistService);
    toastService = inject(ToastService);

    constructor() {
        super({
            isLoading: false,
            gists: [],
            pageSize: 5,
            currentPage: 1,
        });

        this.getSnippets();
        this.getSnippetsOnPageChange(this.getPageTrigger$);
    }

    readonly currentPage$ = this.select(state => state.currentPage);
    readonly pageSize$ = this.select(state => state.pageSize);
    readonly getPageTrigger$ = this.select(
        this.currentPage$,
        this.pageSize$,
        (currentPage, pageSize) => ({ currentPage, pageSize })
    )

    readonly paginatorViewModel$ = this.select(
        this.state$,
        ({ currentPage, pageSize, gists }) =>
            gists?.length > 0 ? ({
                disableNextPage: gists?.length < pageSize,
                disablePreviousPage: currentPage === 1,
                currentPage,
                pageSize
            }) : null
    )

    readonly setPageSize = this.updater((state, pageSize: number) => ({
        ...state,
        pageSize
    }));

    readonly goToNextPage = this.updater(state => ({
        ...state,
        currentPage: state.currentPage + 1
    }));

    readonly goToPreviousPage = this.updater(state => ({
        ...state,
        currentPage: state.currentPage > 1 ? state.currentPage - 1 : 1
    }));

    readonly goToFirstPage = this.updater(state => ({
        ...state,
        currentPage: 1
    }));

    readonly setGists = this.updater((state, gists: GistList[]) => ({
        ...state,
        isLoading: false,
        gists
    }));

    readonly getSnippets = this.effect<void>(trigger$ =>
        trigger$.pipe(
            tap(() => this.patchState({ isLoading: true, gists: [] })),
            switchMap(() => {
                return this.gistService.getList(this.get().pageSize, this.get().currentPage).pipe(
                    tap((gists) => this.setGists(gists)),
                );
            })
        )
    );

    readonly getSnippetsOnPageChange = this.effect<{ pageSize: number, currentPage: number | string }>(trigger$ =>
        trigger$.pipe(
            tap(() => this.patchState({ isLoading: true, gists: [] })),
            switchMap(({ pageSize, currentPage }) => {
                return this.gistService.getList(pageSize, currentPage).pipe(
                    tap((gists) => this.setGists(gists)),
                );
            })
        )
    );

    readonly deleteGist = this.effect<string>((id$) =>
        id$.pipe(
            switchMap((id) => this.gistService.delete(id).pipe(
                tap({
                    next: () => {
                        this.setGists(this.get().gists.filter((gist) => gist.id !== id));
                        this.toastService.show('Gist deleted successfully!');
                    },
                    error: (error) => {
                        this.toastService.show('Failed to delete gist', ToastType.Error);
                    },
                })
            ))
        )
    );
}