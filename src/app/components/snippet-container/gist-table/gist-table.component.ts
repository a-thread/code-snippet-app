import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Gist } from '../../../models/gists';
import { RouterModule } from '@angular/router';
import { SnippetContainerStore } from '../snippet-container.store';
import { GistTableVm } from './gist-table-vm';

@Component({
  selector: 'app-gist-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gist-table.component.html',
  styleUrl: './gist-table.component.scss'
})
export class GistTableComponent {

  viewModel$: Observable<GistTableVm>;

  constructor(
    private store: SnippetContainerStore,
  ) {
    this.viewModel$ = this.store.viewModel$;
  }

  toggleAll(event: Event) {
    this.store.toggleAll(event);
  }

  sort(column: keyof Gist) {
    this.store.sort(column);
  }

  deleteGist(id: string) {
    this.store.deleteGist(id);
  }

}
