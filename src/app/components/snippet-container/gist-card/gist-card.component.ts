import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { GistList } from '../../../models/gists';

@Component({
  selector: 'app-gist-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss'
})
export class GistCardComponent {

  @Input() gist: GistList | undefined = undefined;

}
