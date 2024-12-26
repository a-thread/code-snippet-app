import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GistDetail } from '../models/gist-detail';

@Injectable({
    providedIn: 'root'
})
export class GistDetailService {
    private apiUrl = 'https://api.github.com/gists';

    constructor(private http: HttpClient) { }

    getGistById(id: string): Observable<GistDetail> {
        return this.http.get<GistDetail>(`${this.apiUrl}/${id}`);
    }

    updateGist(gist: any): Observable<GistDetail> {
        return this.http.patch<GistDetail>(`${this.apiUrl}/${gist.id}`, gist);
    }
}
