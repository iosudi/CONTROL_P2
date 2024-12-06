import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageServiceService } from '../services/language-service.service';

@Injectable()
export class LanguageInterceptorInterceptor implements HttpInterceptor {
  constructor(private languageService: LanguageServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const language = this.languageService.getLanguage();

    const modifiedRequest = request.clone({
      setHeaders: {
        lang: language,
      },
    });

    return next.handle(modifiedRequest);
  }
}
