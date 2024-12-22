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
    return this.http.get(environment.secondaryURL + 'project-categories');
  }

  getHomeProductsCategories(): Observable<any> {
    return this.http.get(environment.secondaryURL + 'home-product-Categories');
  }

  getSpecialReviews(): Observable<any> {
    return this.http.get(environment.secondaryURL + 'reviews');
  }

  getProjects(): Observable<any> {
    return this.http.get(environment.secondaryURL + 'projects');
  }

  getProjectDetails(projectId: number): Observable<any> {
    return this.http.get(
      environment.secondaryURL + `projectDetails/${projectId}`
    );
  }

  getPartners(): Observable<any> {
    return this.http.get(environment.secondaryURL + 'partners');
  }
}
