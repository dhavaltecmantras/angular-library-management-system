import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const API_URL = `${environment.apiUrl}`;

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class IssuedBookLogsService {
  constructor(private http: HttpClient) {}

  addIssuedBookLogs(data = {}): Observable<any> {
    return this.http.post(API_URL + 'add-issued-book-logs', data, HTTP_OPTIONS);
  }

  getIssuedBookLogs(): Observable<any> {
    return this.http.get(API_URL + 'get-all-issued-books', HTTP_OPTIONS);
  }

  getBookLogsById(id: number): Observable<any> {
    return this.http.get(`${API_URL}get-book-log-by-id/${id}`, HTTP_OPTIONS);
  }

  updateIssuedBookLogs(data = {}): Observable<any> {
    return this.http.post(
      API_URL + 'update-issued-book-logs',
      data,
      HTTP_OPTIONS
    );
  }
}
