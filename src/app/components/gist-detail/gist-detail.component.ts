import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GistDetailStore } from './gist-detail.store';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { GistDetail } from './models/gist-detail';
import { SyntaxHighlightDirective } from './utils/syntax-highlight.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gist-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SyntaxHighlightDirective],
  templateUrl: './gist-detail.component.html',
  styleUrls: ['./gist-detail.component.scss'],
  providers: [GistDetailStore]
})
export class GistDetailComponent implements OnInit, OnDestroy {

  gistForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    files: new FormArray<FormGroup>([]),

  });

  destroy$ = new Subject<void>();

  private store = inject(GistDetailStore);
  private router = inject(Router);

  get formValue() {
    return this.gistForm.value;
  }

  get fileForms(): FormArray {
    return this.gistForm.controls.files;
  }

  ngOnInit(): void {
    this.store.loading$.pipe(takeUntil(this.destroy$)).subscribe((loading) => {
      if (loading) {
        this.gistForm.disable();
      } else {
        this.gistForm.enable();
      }
    });

    this.store.gist$.pipe(takeUntil(this.destroy$)).subscribe((gist) => {
      if (gist) {
        this.setFormValues(gist);
      }
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateToSnippets(): void {
    this.router.navigate(['/snippets']);
  }

  onSubmit(): void {
    if (this.gistForm.valid) {
      this.store.updateGist({
        description: this.formValue.name || '',
        files: this.formValue.files || [],
      });
    }
  }

  onAddFileClick(): void {
    this.fileForms.insert(0, new FormGroup({
      fileName: new FormControl<string>(''),
      content: new FormControl<string>(''),
    }));
  }

  setFormValues(gist: GistDetail): void {
    const newFormArray = new FormArray<FormGroup>([]);

    Object.keys(gist.files).forEach((key, index) => {
      newFormArray.push(new FormGroup({
        fileName: new FormControl<string>(key),
        content: new FormControl<string>(gist.files[key].content || ''),
      }));
    });

    this.gistForm.setControl('files', newFormArray);
    this.gistForm.patchValue({
      name: gist.description,
    });
  }

}
