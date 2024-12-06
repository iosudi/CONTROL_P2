import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from './core/services/language-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageServiceService,
    public translate: TranslateService
  ) {}

  title = 'CONTROL_P';

  ngOnInit(): void {
    this.languageService.languageSubject.subscribe({
      next: (lang) => {
        this.translate.use(lang); // Set the language based on the value from the service
      },
    });

    // Optionally, check query params for 'lang' and update language if needed
  }
}
