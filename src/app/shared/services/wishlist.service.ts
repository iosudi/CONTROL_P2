import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  token: string = localStorage.getItem('token') || '';

  // API Headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });
  addToWishlist(productId: number) {
    return this.http.post(
      `${environment.baseURL}Wishlist`,
      { productId: productId },
      { headers: this.headers }
    );
  }
}
