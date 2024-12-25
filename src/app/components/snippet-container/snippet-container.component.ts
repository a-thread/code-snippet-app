import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppStore } from '../../app.component.store';
import { SnippetContainerStore } from './snippet-container.store';
import { Gist } from '../../models/gists';
import { GistCardComponent } from "./gist-card/gist-card.component";
import { AddSnippetComponent } from "./add-snippet/add-snippet.component";

@Component({
  selector: 'app-snippet-container',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GistCardComponent,
    AddSnippetComponent
  ],
  providers: [
    SnippetContainerStore,
  ],
  templateUrl: './snippet-container.component.html',
  styleUrl: './snippet-container.component.scss'
})
export class SnippetContainerComponent implements OnInit {

  gists$: Observable<Gist[]>;

  constructor(
    private snippetStore: SnippetContainerStore,
    private appStore: AppStore,
  ) {
    this.gists$ = this.snippetStore.gists$;
  }

  ngOnInit(): void {
    this.snippetStore.loadSnippets(this.appStore.githubToken$);
  }


}

