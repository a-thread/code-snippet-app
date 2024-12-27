import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GistDetail } from '../../../models/gist-detail';
import { FileSlim } from '../../../models/file-slim';
import { GistDto } from '../../../models/gist-dto';

@Injectable({
    providedIn: 'root'
})
export class GistDetailService {
    private apiUrl = 'https://api.github.com/gists';

    constructor(private http: HttpClient) { }

    getGistById(id: string): Observable<GistDetail> {
        return this.http.get<GistDetail>(`${this.apiUrl}/${id}`);
    }

    createGist(dto: GistDto): Observable<GistDetail> {
        return this.http.post<GistDetail>(this.apiUrl, {
            ...dto,
            public: false,
        });
    }

    updateGist(gist: GistDto): Observable<GistDetail> {
        return this.http.patch<GistDetail>(`${this.apiUrl}/${gist.id}`, gist);
    }
}
