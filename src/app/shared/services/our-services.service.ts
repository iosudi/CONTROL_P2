import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OurServicesService {
  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(environment.baseURL + 'services');
  }

  getServiceById(id: number): Observable<any> {
    return this.http.get(environment.baseURL + `serviceDetails/${id}`);
  }
}
