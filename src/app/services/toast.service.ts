import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from '../models/toast-message';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
    toast$ = this.toastSubject.asObservable();

    showToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
        this.toastSubject.next({ message, type });
        setTimeout(() => this.clearToast(), 3000); // Clear toast after 3 seconds
    }

    clearToast() {
        this.toastSubject.next(null);
    }
}