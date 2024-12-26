import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ActivatedRoute } from '@angular/router';
import { GistDetail } from './models/gist-detail';
import { switchMap, tap } from 'rxjs/operators';
import { GistDetailService } from './service/gist-detail.service';
import { FileSlim } from './models/file-slim';
import { ToastService } from '../../services/toast.service';

interface GistDetailState {
    gist: GistDetail | null;
    loading: boolean;
    error: string | null;
}

@Injectable()
export class GistDetailStore extends ComponentStore<GistDetailState> {
    constructor(private gistService: GistDetailService, private route: ActivatedRoute, private toastService: ToastService) {
        super({ gist: null, loading: false, error: null });

        this.loadGistDetail();
    }

    readonly gist$ = this.select((state) => state.gist);
    readonly loading$ = this.select((state) => state.loading);
    readonly error$ = this.select((state) => state.error);

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
                        return this.gistService.getGistById(id);
                    }),
                    tap({
                        next: (gist) => this.patchState({ gist, loading: false }),
                        error: (error) => this.patchState({ error: error.message, loading: false }),
                    })
                )
            )
        )
    );

    readonly updateGist = this.effect<{ description: string, files: FileSlim[] }>((trigger$) =>
        trigger$.pipe(
            tap(() => this.patchState({ loading: true, error: null })),

            switchMap(({ description, files }) => {
                const gist = this.get().gist
                const updatedGist = {
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
                }

                return this.gistService.updateGist(updatedGist).pipe(
                    tap({
                        next: (gist) => {
                            this.patchState({ gist, loading: false });
                            this.toastService.showToast('Gist updated successfully!', 'success');
                        },
                        error: (error) => {
                            this.patchState({ error: error.message, loading: false });
                            this.toastService.showToast('Failed to update gist', 'error');
                        },
                    })
                )
            }
            )
        )
    );
}