import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStore } from './app.component.store';
import { ToastComponent } from './toast/toast.component';

@Component({
    selector: 'app-root',
    template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
    `,
    imports: [
        RouterOutlet,
        ToastComponent,
    ],
    providers: [
        AppStore,
    ]
})
export class AppComponent { }