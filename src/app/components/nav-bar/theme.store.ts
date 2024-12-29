import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { tap } from 'rxjs';
import { ThemeService } from './theme.service';

export interface ThemeState {
    isDarkMode: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class ThemeStore extends ComponentStore<ThemeState> {


    private themeService = inject(ThemeService);

    readonly isDarkMode$ = this.select((state) => state.isDarkMode);

    constructor() {
        super({
            isDarkMode: false,
        });

        this.initTheme();
        this.listenToThemeChange();
    }

    readonly toggleTheme = this.updater((state) => {
        const isDarkMode = !state.isDarkMode;
        this.themeService.enableDarkTheme(isDarkMode);
        return {
            ...state,
            isDarkMode,
        };
    });

    readonly updateTheme = this.updater((state, isDarkMode: boolean) => {
        this.themeService.enableDarkTheme(isDarkMode);
        return {
            ...state,
            isDarkMode,
        };
    });

    readonly initTheme = this.effect<void>((trigger$) =>
        trigger$.pipe(
            tap(() => {
                const saveThemeIsDark = this.themeService.getShouldEnableDarkTheme();
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldEnableDarkMode = saveThemeIsDark || prefersDark;
                this.updateTheme(shouldEnableDarkMode);
            })
        )
    );

    readonly listenToThemeChange = this.effect<void>((trigger$) =>
        trigger$.pipe(
            tap(() => {
                // Listen for changes in system preferences
                window
                    .matchMedia('(prefers-color-scheme: dark)')
                    .addEventListener('change', (event) => {
                        const prefersDark = event.matches;
                        this.updateTheme(prefersDark);
                    });
            })
        )
    );
}
