import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStore } from '../../app.component.store';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Authenticating...</p>`,
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private appStore: AppStore
  ) { }

  ngOnInit(): void {
    // Get the authorization code from the URL query parameters
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      console.log(code)
      if (code) {
        this.appStore.authenticateUser(of(code));
      }
    });
  }
}
