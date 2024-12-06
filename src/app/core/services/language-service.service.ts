import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageServiceService {
  private readonly LANGUAGE_COOKIE_KEY = 'language';

  constructor(private cookieService: CookieService) {}

  languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('ar');

  setLanguage(lang: string): void {
    // Set language in the cookie with a 30-day expiration
    this.cookieService.set(this.LANGUAGE_COOKIE_KEY, lang, { expires: 30 });
  }

  getLanguage(): string {
    // Retrieve language from the cookie (default to 'en' if not found)
    return this.cookieService.get(this.LANGUAGE_COOKIE_KEY) || 'en';
  }
}
