import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  token: string = localStorage.getItem('token') || '';

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  public getPastOrders(): Observable<any> {
    return this.http.get(environment.baseURL + 'Ordering/Get-Past-Orders', {
      headers: this.headers,
    });
  }

  public getOrderDetails(id: number): Observable<any> {
    return this.http.get(
      environment.baseURL + `Ordering/Get-Order-Details${id}`,
      { headers: this.headers }
    );
  }
}
