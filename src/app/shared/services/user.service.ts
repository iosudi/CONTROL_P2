import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  token: string = localStorage.getItem('token') || '';
  decoded: any = jwtDecode(this.token);
  userId =
    this.decoded[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ];

  userName =
    this.decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  // API Headers
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
  });

  getUserById(): Observable<any> {
    return this.http.get(
      environment.baseURL + `User/User-Details/${this.userId}`
    );
  }
  updateUserInfo(userInfo: any): Observable<any> {
    return this.http.put(
      environment.baseURL + `User/Update-User-Info`,
      {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        displayName: userInfo.displayName,
        email: userInfo.email,
      },
      {
        headers: this.headers,
      }
    );
  }

  public changePassword(password: any): Observable<any> {
    return this.http.put(
      environment.baseURL + `User/Change-Password`,
      {
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        passwordConfirmation: password.passwordConfirmation,
      },
      {
        headers: this.headers,
      }
    );
  }
}
