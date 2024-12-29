import { Component, inject, output } from '@angular/core';
import { ThemeStore } from './theme.store'; // Adjust the import path as necessary
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [AsyncPipe],
  providers: [ThemeStore],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  private themeStore = inject(ThemeStore);

  isDarkMode$ = this.themeStore.isDarkMode$;

  toggleTheme() {
    this.themeStore.toggleTheme();
  }

}
