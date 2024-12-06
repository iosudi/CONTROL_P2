import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/core/services/language-service.service';

@Component({
  selector: 'app-mobile-links-menu',
  templateUrl: './mobile-links-menu.component.html',
  styleUrls: ['./mobile-links-menu.component.scss'],
})
export class MobileLinksMenuComponent {
  constructor(
    private router: Router,
    public translate: TranslateService,
    private _LanguageService: LanguageServiceService
  ) {}

  @Input() menuOpened: boolean = true;
  @Output() menuStatusChange = new EventEmitter<boolean>();

  currentLanguage: string = 'ar';

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });

    const savedLang = this._LanguageService.getLanguage();
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);

    this.toggleBodyScroll();
  }

  toggleBodyScroll(): void {
    document.body.style.overflow = this.menuOpened ? 'hidden' : 'auto';
  }

  changeLanguage(): void {
    // Toggle between 'en' and 'ar'
    const newLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    this._LanguageService.setLanguage(newLanguage); // Update the language
    this.currentLanguage = newLanguage;

    // Reload the page to fetch new data with the updated language

    window.location.reload(); // Reload the page
  }

  closeMenu() {
    this.menuOpened = false;
    this.menuStatusChange.emit(this.menuOpened);
    this.toggleBodyScroll();
  }
}
