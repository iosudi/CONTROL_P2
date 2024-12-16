import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ShopService } from 'src/app/shared/services/shop.service';

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

  product: any = {};

  constructor(
    public translate: TranslateService,
    private ActivatedRoute: ActivatedRoute,
    private _ShopService: ShopService,
    private fb: FormBuilder
  ) {}

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

    this.ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        if (params.get('id')) {
          const productId = Number(params.get('id'));
          this.fetchData(productId);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.home = { label: 'Home Page', routerLink: '/home' };

    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  fetchData(productId: number): void {
    this._ShopService.getProductById(productId).subscribe({
      next: (product) => {
        console.log(product);
        this.product = product;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeActiveSection(section: string) {
    this.activeSection = section;
  }
}
