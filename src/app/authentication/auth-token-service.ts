import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {

    private authTokenKey = 'githubAuthToken';

    constructor() { }

    setAuthToken(token: string): void {
        localStorage.setItem(this.authTokenKey, token);
    }

    getAuthToken(): string | null {
        return localStorage.getItem(this.authTokenKey);
    }

    removeAuthToken(): void {
        localStorage.removeItem(this.authTokenKey);
    }

    isAuthenticated(): boolean {
        return !!this.getAuthToken();
    }
}