import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}

  token: string = localStorage.getItem('token') || '';

  decoded: any = jwtDecode(this.token);
  userId =
    this.decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

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

  getProductsByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(environment.baseURL + 'Product/filter', {
      params: {
        categoryIds: categoryId.toString(),
        userId: this.userId?.toString() || '',
      },
    });
  }
}
