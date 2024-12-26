import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './app.component.store';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    imports: [
        RouterOutlet,
    ],
    providers: [
        AppStore,
    ]
})
export class AppComponent { }