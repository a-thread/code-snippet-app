import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GistTableStore } from '../gist-table.store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  imports: [NgIf, AsyncPipe, NgForOf, MatFormField, MatSelectModule, MatIconButton, MatIcon],
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  private gistTableStore = inject(GistTableStore);

  viewModel$ = this.gistTableStore.paginatorViewModel$;

  pageSizeOptions: number[] = [5, 10, 25, 50];

  goToNextPage(): void {
    this.gistTableStore.goToNextPage();
  }

  goToPreviousPage(): void {
    this.gistTableStore.goToPreviousPage();
  }

  goToFirstPage(): void {
    this.gistTableStore.goToFirstPage();
  }

  onPageSizeChange(newPageSize: number): void {
    this.gistTableStore.setPageSize(newPageSize);
  }
}
