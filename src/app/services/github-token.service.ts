import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GithubTokenService {

    private githubTokenKey = 'githubToken';

    constructor() { }

    setGithubToken(token: string): void {
        localStorage.setItem(this.githubTokenKey, token);
    }

    getGithubToken(): string | null {
        return localStorage.getItem(this.githubTokenKey);
    }

    removeGithubToken(): void {
        localStorage.removeItem(this.githubTokenKey);
    }

    clear(): void {
        localStorage.clear();
    }
}