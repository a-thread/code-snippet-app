import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/access-token';
import { Gist } from '../models/gists';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private backendUrl = 'http://localhost:3000/api/authenticate';
  private baseUrl = 'https://api.github.com/gists';

  constructor(private http: HttpClient) { }

  getGists(token: string): Observable<Gist[]> {
    const headers = new HttpHeaders({
      Authorization: `token ${token}`
    });
    return this.http.get<Gist[]>(`${this.baseUrl}`, { headers });
  }

  createGist(code: string, notes: string, language: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `token ${token}`
    });
    const gistData = {
      description: 'Code snippet with notes',
      public: false,
      files: {
        [`snippet.${language}`]: { content: code },
        'notes.txt': { content: notes }
      }
    };
    return this.http.post(this.baseUrl, gistData, { headers });
  }

  getAccessToken(authCode: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.backendUrl, { code: authCode });
  }

}
