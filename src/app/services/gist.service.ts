import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/access-token';
import { GistList } from '../models/gists';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private backendUrl = 'http://localhost:3000/api/authenticate';
  private baseUrl = 'https://api.github.com/gists';

  constructor(private http: HttpClient) { }

  getList(): Observable<GistList[]> {
    return this.http.get<GistList[]>(`${this.baseUrl}`);
  }

  createGist(code: string, name: string, language: string): Observable<any> {
    const gistData = {
      description: name,
      public: false,
      files: {
        [`snippet.${language}`]: { content: code },
      }
    };
    return this.http.post(this.baseUrl, gistData);
  }

  deleteGist(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  getAccessToken(authCode: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.backendUrl, { code: authCode });
  }

}
