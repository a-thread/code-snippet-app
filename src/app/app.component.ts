import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    template: `
    <app-nav-bar></app-nav-bar>
    <router-outlet></router-outlet>
    `,
    imports: [
        RouterOutlet,
        NavBarComponent
    ],
})
export class AppComponent { }