import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class BookService {
  constructor(private http: HttpClient) {}

  addBookDetails(data: any): Observable<any> {
    return this.http.post(API_URL + 'add-book-details', data, HTTP_OPTIONS);
  }

  getBookDetails(): Observable<any> {
    return this.http.get(API_URL + 'get-book-details', HTTP_OPTIONS);
  }

  getBookDetailsById(id: number): Observable<any> {
    return this.http.get(`${API_URL}get-book-details-by-id/${id}`, HTTP_OPTIONS);
  }

  deleteBookDetails(id: number): Observable<any> {
    return this.http.delete(`${API_URL}delete-book-details/${id}`, HTTP_OPTIONS);
  }

  updateBookDetails(data: any): Observable<any> {
    return this.http.post(API_URL + 'update-book-details', data, HTTP_OPTIONS);
  }

  getAllFormData(): Observable<any> {
    return this.http.get(`${API_URL}get-form-data`, HTTP_OPTIONS);
  }
}
