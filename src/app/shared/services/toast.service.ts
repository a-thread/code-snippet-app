import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastType } from '../models/toast-message';

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    private snackBar = inject(MatSnackBar);

    show(message: string, type: ToastType = ToastType.Success, action: string = '', duration: number = 3000) {
        const config: MatSnackBarConfig = {
            duration,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: [`snack-${type}`]
        };
        this.snackBar.open(message, action, config);
    }

}