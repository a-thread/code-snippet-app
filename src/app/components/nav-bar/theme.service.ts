import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private renderer: Renderer2;
    private darkThemeClass = 'dark';
    private localStorageKey = 'shouldEnabledDarkTheme';

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
    }

    getShouldEnableDarkTheme(): boolean {
        return localStorage.getItem(this.localStorageKey) === 'true';
    }

    enableDarkTheme(enable: boolean): void {
        localStorage.setItem(this.localStorageKey, enable ? 'true' : 'false');
        if (enable) {
            this.renderer.addClass(document.body, this.darkThemeClass);
        } else {
            this.renderer.removeClass(document.body, this.darkThemeClass);
        }
    }

}