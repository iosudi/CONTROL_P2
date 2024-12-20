import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  token: string = localStorage.getItem('token') || '';

  // API Headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });
  getCategories(): Observable<any> {
    return this.http.get(environment.baseURL + 'Category/Get-All');
  }

  getProducts(): Observable<any> {
    return this.http.get(environment.baseURL + 'Product/GetAllProducts', {
      headers: this.headers,
    });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(environment.baseURL + `Product/GetProduct/${id}`);
  }

  addProductReview(review: any): Observable<any> {
    return this.http.post(environment.baseURL + 'ProductReviews/add', review, {
      headers: this.headers,
    });
  }
}
