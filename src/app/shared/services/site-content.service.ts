import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SiteContentService {
  constructor(private http: HttpClient) {}

  getOurWorks(): Observable<any> {
    return this.http.get(environment.baseURL + 'project-categories');
  }

  getHomeProductsCategories(): Observable<any> {
    return this.http.get(environment.baseURL + 'home-product-Categories');
  }

  getSpecialReviews(): Observable<any> {
    return this.http.get(environment.baseURL + 'reviews');
  }

  getProjects(): Observable<any> {
    return this.http.get(environment.baseURL + 'projects');
  }

  getProjectDetails(projectId: number): Observable<any> {
    return this.http.get(environment.baseURL + `projectDetails/${projectId}`);
  }

  getPartners(): Observable<any> {
    return this.http.get(environment.baseURL + 'partners');
  }
}
