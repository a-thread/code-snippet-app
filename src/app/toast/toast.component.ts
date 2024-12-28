import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastMessage } from '../models/toast-message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toast: ToastMessage | null = null;

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }
}