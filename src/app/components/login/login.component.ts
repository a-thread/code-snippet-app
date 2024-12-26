import { Component, OnInit } from '@angular/core';
import { AppStore } from '../../app.component.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
  ],
  template: `<p>Loading...</p>`,
})
export class LoginComponent implements OnInit {

  constructor(
    private appStore: AppStore,
  ) { }


  ngOnInit(): void {
    this.appStore.handleAuthentication();
  }

}