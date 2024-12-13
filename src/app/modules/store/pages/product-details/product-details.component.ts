import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  images: any[] = [
    './assets/images/portfolio/1.jpg',
    './assets/images/portfolio/3.jpg',
    './assets/images/portfolio/2.png',
    './assets/images/portfolio/4.jpg',
    './assets/images/portfolio/5.jpg',
    './assets/images/portfolio/8.jpg',
    './assets/images/portfolio/9.png',
    './assets/images/portfolio/7.jpg',
    './assets/images/portfolio/6.jpg',
    './assets/images/portfolio/10.jpg',
  ];

  constructor(public translate: TranslateService) {}

  activeSection: string = 'product-description';
  direction: string = 'ltr'; // Default direction

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  productImagesBreakpoints = {
    0: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };

  ngOnInit() {
    this.items = [
      { label: 'Shop', routerLink: '/shop' },
      { label: 'Modern Canvas Painting' },
    ];

    this.home = { label: 'Home Page', routerLink: '/home' };

    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  changeActiveSection(section: string) {
    this.activeSection = section;
  }
}
