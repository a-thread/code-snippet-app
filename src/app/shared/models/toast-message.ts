export interface ToastMessage {
    message: string;
    type: ToastType;
}

export enum ToastType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning'
}