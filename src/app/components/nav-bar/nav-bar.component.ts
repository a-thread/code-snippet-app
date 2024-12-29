import { Component, inject } from '@angular/core';
import { ThemeStore } from './theme.store'; // Adjust the import path as necessary
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatSlideToggleModule,
  ],
  providers: [ThemeStore],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  private themeStore = inject(ThemeStore);

  toggleTheme() {
    this.themeStore.toggleTheme();
  }

}
