import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(registerForm: any): Observable<any> {
    return this.http.post(
      environment.baseURL + 'Auth/RegisterUser',
      registerForm
    );
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(environment.baseURL + 'Auth/Login', loginForm);
  }

  register(registerForm: any): Observable<any> {
    return this.http.post(environment.baseURL + 'Auth/RegisterUser', {
      userName: registerForm.userName,
      email: registerForm.email,
      password: registerForm.password,
    });
  }
}
