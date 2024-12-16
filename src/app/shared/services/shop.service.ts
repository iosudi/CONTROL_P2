import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiJmOWZhMjFhOC04Yzc0LTQ2NzgtYWRiMC1jYTdiZTBjMzZiNzciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMSIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0IiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE1NyIsImV4cCI6MTczNDQ0NzUwMCwiaWF0IjoxNzM0Mzg3NTAwLCJuYmYiOjE3MzQzODc1MDB9.ac5hUIUY5GltPOfBCKreP2hOUbFb5DB_XiZ0I39K8jE';

  getCategories(): Observable<any> {
    return this.http.get(environment.baseURL + 'Category/Get-All');
  }

  getProducts(): Observable<any> {
    return this.http.get(environment.baseURL + 'Product/GetAllProducts/');
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(environment.baseURL + `Product/GetProduct/${id}`);
  }

  addProductReview(review: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Add token in Authorization header
    });
    return this.http.post(environment.baseURL + 'ProductReviews/add', review, {
      headers,
    });
  }
}
