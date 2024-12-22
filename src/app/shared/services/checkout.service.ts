import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  token: string = localStorage.getItem('token') || '';
  decoded: any = jwtDecode(this.token);
  userId =
    this.decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  public getAddresses(): Observable<any> {
    return this.http.get(
      environment.baseURL + `Address/Get-Addresses${this.userId}`,
      { headers: this.headers }
    );
  }

  public addAddress(address: object): Observable<any> {
    return this.http.post(
      environment.baseURL + 'Address/Add-Address',
      address,
      { headers: this.headers }
    );
  }

  public editAddress(address: object): Observable<any> {
    return this.http.put(
      environment.baseURL + 'Address/Update-Address',
      address,
      { headers: this.headers }
    );
  }

  public CheckoutCOD(): Observable<any> {
    return this.http.post(
      environment.baseURL + 'Ordering/add-order',
      {},
      {
        headers: this.headers,
      }
    );
  }

  public CheckoutCard(orderId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      SuccessURL: `http://localhost:4200/order-details/${orderId}`,
      FailedURL: `http://localhost:4200/`,
    });

    return this.http.post(
      environment.baseURL + 'Strip/Pay',
      {},
      {
        headers: headers,
      }
    );
  }
}
