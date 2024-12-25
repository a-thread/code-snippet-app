import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { Gist } from '../../../models/gists';

@Component({
  selector: 'app-gist-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gist-card.component.html',
  styleUrl: './gist-card.component.scss'
})
export class GistCardComponent {

  @Input() gist: Gist | undefined = undefined;

}
