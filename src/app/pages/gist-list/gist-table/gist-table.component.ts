import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GistTableStore } from './gist-table.store';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorComponent } from './paginator/paginator.component';

@Component({
  selector: 'app-gist-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule, PaginatorComponent],
  providers: [GistTableStore],
  templateUrl: './gist-table.component.html',
  styleUrl: './gist-table.component.scss'
})
export class GistTableComponent {
  private store = inject(GistTableStore);

  displayedColumns: string[] = ['description', 'updated_at', 'action'];

  viewModel$ = this.store.state$;

  toggleAll(event: Event) {
    const isChecked = (event?.target as HTMLInputElement)?.checked;
    this.store.toggleAll(isChecked);
  }

  deleteGist(id: string) {
    this.store.deleteGist(id);
  }

}
