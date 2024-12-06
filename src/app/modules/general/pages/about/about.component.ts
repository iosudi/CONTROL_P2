import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SiteInfoService } from 'src/app/shared/services/site-info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(
    private _SiteInfoService: SiteInfoService,
    public translate: TranslateService
  ) {}
  direction: string = 'ltr'; // Default direction

  expandedIndex: number | null = null;
  teamMembers: any[] = [];
  faqs: any[] = [];

  TeamSlider = {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
    },
    500: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });

    this._SiteInfoService.getTeamMembers().subscribe({
      next: (teamMembers) => {
        this.teamMembers = teamMembers.data;
      },
      error: (error) => {
        console.error('Error retrieving team members:', error);
      },
    });

    this._SiteInfoService.getFaqs().subscribe({
      next: (faqs) => {
        this.faqs = faqs.data;
      },
      error: (error) => {
        console.error('Error retrieving FAQs:', error);
      },
    });
  }

  toggleExpand(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}
