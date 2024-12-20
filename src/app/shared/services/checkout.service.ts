import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  token: string = localStorage.getItem('token') || '';

  // API Headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  // Methods to proceed checkout

  public addAddress(address: object): Observable<any> {
    return this.http.post(
      environment.baseURL + 'Address/Add-Address',
      address,
      { headers: this.headers }
    );
  }
}
