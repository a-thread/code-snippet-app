import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GistList } from '../models/gist-list';
import { GistDetail } from '../models/gist-detail';
import { GistDto } from '../models/gist-dto';

@Injectable({
  providedIn: 'root'
})
export class GistService {
  private baseUrl = 'https://api.github.com/gists';

  constructor(private http: HttpClient) { }

  getList(pageSize: number, currentPage: number | string): Observable<GistList[]> {
    const params = new HttpParams()
      .set("page", currentPage)
      .set("per_page", pageSize);
    return this.http.get<GistList[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<GistDetail> {
    return this.http.get<GistDetail>(`${this.baseUrl}/${id}`);
  }

  create(dto: GistDto): Observable<GistDetail> {
    return this.http.post<GistDetail>(this.baseUrl, {
      ...dto,
    });
  }

  update(gist: GistDto): Observable<GistDetail> {
    return this.http.patch<GistDetail>(`${this.baseUrl}/${gist.id}`, gist);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
