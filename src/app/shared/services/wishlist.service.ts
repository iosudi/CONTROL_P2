import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  public addToWishlist(productId: number): Observable<any> {
    return this.http.post(
      `${environment.baseURL}Wishlist`,
      { productId: productId },
      { headers: this.headers }
    );
  }

  public getWishlistItems(): Observable<any> {
    return this.http.get(`${environment.baseURL}Wishlist/GetWishlistforUser`, {
      headers: this.headers,
    });
  }

  // TODO: Delete can not get more than 2 parameters so modify the backend
  // public removeFromWishlist(productId: number): Observable<any> {
  //   return this.http.delete(`${environment.baseURL}Wishlist/${productId}`, {
  //     headers: this.headers,
  //   });
  // }
}
