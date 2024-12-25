import { Component } from '@angular/core';
import { SnippetContainerStore } from '../snippet-container.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-snippet',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-snippet.component.html',
  styleUrl: './add-snippet.component.scss'
})
export class AddSnippetComponent {
  newCode = '';
  newNotes = '';
  newLanguage = '';

  constructor(
    private snippetStore: SnippetContainerStore
  ) { }

  saveSnippet(): void {
    this.snippetStore.saveSnippet({ code: this.newCode, notes: this.newNotes, language: this.newLanguage });
    this.newCode = '';
    this.newNotes = '';
    this.newLanguage = '';
  }
}
