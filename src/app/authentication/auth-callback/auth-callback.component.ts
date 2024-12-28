import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthCallbackStore } from './auth-callback.store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  imports: [CommonModule],
  providers: [AuthCallbackStore],
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private store = inject(AuthCallbackStore);

  public isInErrorState$ = this.store.isInErrorState$;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const authCode = params['code'];
      this.store.authenticateUser(authCode);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  retryClicked(): void {
    this.store.retryLogin();
  }
}
