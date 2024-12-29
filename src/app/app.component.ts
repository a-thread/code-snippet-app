import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    template: `
    <app-nav-bar>
        <router-outlet></router-outlet>
    </app-nav-bar>
    `,
    imports: [
        RouterOutlet,
        NavBarComponent
    ],
})
export class AppComponent { }