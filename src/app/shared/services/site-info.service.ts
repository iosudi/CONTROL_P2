import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SiteInfoService {
  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<any> {
    return this.http.get(environment.baseURL + 'ourTeam');
  }

  getFaqs(): Observable<any> {
    return this.http.get(environment.baseURL + 'Faqs');
  }

  contact(form: object): Observable<any> {
    return this.http.post(environment.baseURL + 'contact', form);
  }
}
