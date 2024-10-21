import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppStore } from '../../app.component.store';
import { Snippet } from '../../models/snippet';
import { SnippetContainerStore } from './snippet-container.store';

@Component({
  selector: 'app-snippet-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    SnippetContainerStore,
  ],
  templateUrl: './snippet-container.component.html',
  styleUrl: './snippet-container.component.scss'
})
export class SnippetContainerComponent implements OnInit {

  newCode = '';
  newNotes = '';
  newLanguage = '';

  snippets$: Observable<Snippet[]>;

  constructor(
    private snippetStore: SnippetContainerStore,
    private appStore: AppStore,
  ) {
    this.snippets$ = this.snippetStore.snippets$;
  }

  ngOnInit(): void {
    this.snippetStore.loadSnippets(this.appStore.githubToken$);
  }

  saveSnippet(): void {
    console.log(this.newCode, this.newNotes, this.newLanguage);
    this.snippetStore.saveSnippet({ code: this.newCode, notes: this.newNotes, language: this.newLanguage });
    this.newCode = '';
    this.newNotes = '';
    this.newLanguage = '';
  }
}

