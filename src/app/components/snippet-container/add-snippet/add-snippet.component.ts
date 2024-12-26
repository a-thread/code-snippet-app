import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SnippetContainerStore } from '../snippet-container.store';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-snippet',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-snippet.component.html',
  styleUrl: './add-snippet.component.scss'
})
export class AddSnippetComponent {
  snippetForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    code: new FormControl<string>('', Validators.required),
    language: new FormControl<string>('', Validators.required)
  });

  constructor(private snippetStore: SnippetContainerStore) { }

  onSubmit(): void {
    if (this.snippetForm.valid) {
      const formValue = this.snippetForm.getRawValue();
      this.snippetStore.saveSnippet({
        code: formValue.code || '',
        name: formValue.name || '',
        language: formValue.language || ''
      });
      this.snippetForm.reset();
    }
  }
}
