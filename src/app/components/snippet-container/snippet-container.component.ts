import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SnippetContainerStore } from './snippet-container.store';
import { AddSnippetComponent } from "./add-snippet/add-snippet.component";
import { GistTableComponent } from "./gist-table/gist-table.component";

@Component({
  selector: 'app-snippet-container',
  imports: [
    CommonModule,
    FormsModule,
    AddSnippetComponent,
    GistTableComponent
  ],
  providers: [
    SnippetContainerStore,
  ],
  templateUrl: './snippet-container.component.html',
  styleUrl: './snippet-container.component.scss'
})
export class SnippetContainerComponent {
}

