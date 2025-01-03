import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ActivatedRoute, Router } from '@angular/router';
import { GistDetail } from '../../shared/models/gist-detail';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FileSlim } from '../../shared/models/file-slim';
import { ToastType } from '../../shared/models/toast-message';
import { GistDto } from '../../shared/models/gist-dto';
import { GistService } from '../../shared/services/gist.service';
import { ToastService } from '../../shared/services/toast.service';

interface GistDetailState {
    gist: GistDetail | null;
    loading: boolean;
    error: string | null;
}

@Injectable()
export class GistDetailStore extends ComponentStore<GistDetailState> {

    gistService = inject(GistService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    toastService = inject(ToastService);

    constructor() {
        super({ gist: null, loading: false, error: null });

        this.loadGistDetail();
    }

    readonly gist$ = this.select((state) => state.gist);
    readonly loading$ = this.select((state) => state.loading);
    readonly error$ = this.select((state) => state.error);
    readonly shouldCreateNew$ = this.select(this.route.paramMap, (params) => params.get('id') === 'new');
    readonly isPublic$ = this.select(this.gist$, (gist) => gist?.public || false);

    readonly viewModel$ = this.select(
        this.loading$,
        this.isPublic$,
        this.shouldCreateNew$,
        (isLoading, isPublic, isNew) => ({
            isLoading,
            isPublic,
            isNew,
        })
    )


    readonly loadGistDetail = this.effect<void>((trigger$) =>
        trigger$.pipe(
            tap(() => this.patchState({ loading: true, error: null })),
            switchMap(() =>
                this.route.paramMap.pipe(
                    switchMap((params) => {
                        const id = params.get('id');
                        if (!id) {
                            throw new Error('No gist ID found in route');
                        }
                        if (id === 'new') {
                            return [{
                                id: '',
                                description: '',
                                files: {
                                    '': { content: '' }
                                },
                            } as unknown as GistDetail];
                        }
                        return this.gistService.getById(id);
                    }),
                    tap({
                        next: (gist) => this.patchState({ gist, loading: false }),
                        error: (error) => this.patchState({ error: error.message, loading: false }),
                    })
                )
            )
        )
    );

    readonly submitClicked = this.effect<{ description: string, files: FileSlim[] }>((dto$) =>
        dto$.pipe(
            withLatestFrom(this.shouldCreateNew$),
            tap(([dto, shouldCreateNew]) => {
                if (shouldCreateNew) {
                    this.createGist(dto);
                } else {
                    this.updateGist(dto);
                }
            })
        )
    );

    readonly updateGist = this.effect<{ description: string, files: FileSlim[] }>((trigger$) =>
        trigger$.pipe(
            tap(() => this.patchState({ loading: true, error: null })),
            map(({ description, files }): GistDto => {
                const gist = this.get().gist;
                return {
                    ...gist,
                    id: gist?.id || '',
                    description,
                    files: {
                        ...gist?.files,
                        ...files.reduce((acc, file) => {
                            acc[file.fileName] = { content: file.content };
                            return acc;
                        }, {} as Record<string, { content: string }>)
                    }
                };
            }),
            switchMap((dto) =>
                this.gistService.update(dto).pipe(
                    tap({
                        next: (gist) => {
                            this.router.navigate(['']);
                            this.toastService.show('Gist updated successfully!');
                        },
                        error: (error) => {
                            this.patchState({ error: error.message, loading: false });
                            this.toastService.show('Failed to update gist', ToastType.Error);
                        },
                    })
                )
            )
        )
    );

    readonly togglePublic = this.effect<void>((trigger$) =>
        trigger$.pipe(
            tap(() => this.patchState({ loading: true, error: null })),
            map((): GistDto => {
                const gist = this.get().gist;
                return {
                    public: !gist?.public,
                    description: gist?.description || '',
                    files: gist?.files || {}
                };
            }),
            switchMap((dto) =>
                this.gistService.create(dto).pipe(
                    tap({
                        next: (gist) => {
                            this.deleteGistAfterPublishing();
                            this.router.navigate([gist.id]);
                            this.toastService.show('Gist updated successfully!');
                        },
                        error: (error) => {
                            this.patchState({ error: error.message, loading: false });
                            this.toastService.show('Failed to update gist.', ToastType.Error);
                        },
                    })
                )
            )
        )
    );

    readonly createGist = this.effect<{ description: string, files: FileSlim[] }>((dto$) =>
        dto$.pipe(
            map(({ description, files }): GistDto => ({
                description,
                public: false,
                files: {
                    ...files.reduce((acc, file) => {
                        acc[file.fileName] = { content: file.content };
                        return acc;
                    }, {} as Record<string, { content: string }>)
                }
            })),
            switchMap((dto) => {
                return this.gistService.create(dto).pipe(
                    tap({
                        next: (gist) => {
                            this.router.navigate(['']);
                            this.toastService.show('Gist created successfully!');
                        },
                        error: (error) => {
                            this.patchState({ error: error.message, loading: false });
                            this.toastService.show('Failed to create gist', ToastType.Error);
                        },
                    })
                );
            })
        )
    );

    readonly deleteGistAfterPublishing = this.effect<void>((trigger$) =>
        trigger$.pipe(
            switchMap(() => {
                return this.gistService.delete(this.get().gist?.id || '').pipe(
                    tap({
                        error: (error) => {
                            this.toastService.show('Failed to delete former gist.', ToastType.Error);
                        },
                    })
                );
            })
        )
    );

    readonly deleteGist = this.effect<void>((trigger$) =>
        trigger$.pipe(
            switchMap(() => {
                return this.gistService.delete(this.get().gist?.id || '').pipe(
                    tap({
                        next: (gist) => {
                            this.router.navigate(['']);
                            this.toastService.show('Gist deleted successfully!');
                        },
                        error: (error) => {
                            this.toastService.show('Failed to delete gist.', ToastType.Error);
                        },
                    })
                );
            })
        )
    );
}