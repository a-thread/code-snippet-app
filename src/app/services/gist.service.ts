import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/access-token';
import { GistList } from '../models/gists';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private backendUrl = `${environment.authApiUrl}/api/authenticate`;
  private baseUrl = 'https://api.github.com/gists';

  constructor(private http: HttpClient) { }

  getList(): Observable<GistList[]> {
    return this.http.get<GistList[]>(this.baseUrl);
  }

  deleteGist(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAccessToken(authCode: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(this.backendUrl, { code: authCode });
  }

}
