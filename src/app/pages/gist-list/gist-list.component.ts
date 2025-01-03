import { Component, inject } from '@angular/core';
import { GistTableComponent } from './gist-table/gist-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gist-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GistTableComponent,
    MatButtonModule
  ],
  templateUrl: './gist-list.component.html',
  styleUrl: './gist-list.component.scss'
})
export class GistListComponent {

  router = inject(Router);

  addNewClicked(): void {
    this.router.navigate(['new']);
  }

}
