import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStore } from './login.store';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
  ],
  providers: [LoginStore],
  template: `<p>Loading...</p>`,
})
export class LoginComponent implements OnInit {

  private loginStore = inject(LoginStore)

  ngOnInit(): void {
    this.loginStore.handleAuthentication();
  }

}