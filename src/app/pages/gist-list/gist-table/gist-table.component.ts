import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GistList } from '../../../models/gists';
import { RouterModule } from '@angular/router';
import { SortColumnIconPipe } from './sort-column-icon.pipe';
import { GistTableStore } from './gist-table.store';

@Component({
  selector: 'app-gist-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SortColumnIconPipe],
  providers: [GistTableStore],
  templateUrl: './gist-table.component.html',
  styleUrl: './gist-table.component.scss'
})
export class GistTableComponent {
  private store = inject(GistTableStore);

  viewModel$ = this.store.viewModel$;

  toggleAll(event: Event) {
    const isChecked = (event?.target as HTMLInputElement)?.checked;
    this.store.toggleAll(isChecked);
  }

  sort(column: keyof GistList) {
    this.store.sort(column);
  }

  deleteGist(id: string) {
    console.log('Deleting gist with id:', id);
    this.store.deleteGist(id);
  }

}
