import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OurServicesService } from 'src/app/shared/services/our-services.service';
import { SiteContentService } from 'src/app/shared/services/site-content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _SiteContentService: SiteContentService,
    private _OurServicesService: OurServicesService,
    private renderer: Renderer2,
    public translate: TranslateService
  ) {}
  direction: string = 'ltr'; // Default direction
  phoneNumber: string = '966547223203';
  message: string = 'مرحبًا، أود الاستفسار عن خدماتكم.';

  @ViewChild('ourWorkSwiper', { static: false }) ourWorkSwiper?: ElementRef;

  ourWork: any[] = [];
  eventImages: string[] = [];
  eventCategoryName: string = '';

  services: any[] = [];
  reviews: any[] = [];
  partners: any[] = [];
  productsCategories: any[] = [];

  activeCategory: number = 1;
  activeCategoryProducts: any[] = [];
  activeCategoryName: string | undefined;

  activeSlideIndex = 0;

  ourWorkBreakpoints = {
    0: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    445: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    501: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    525: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    671: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    1050: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1267: {
      slidesPerView: 3.75,
      spaceBetween: 20,
    },
    1480: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
    1700: {
      slidesPerView: 5.25,
      spaceBetween: 20,
    },
  };

  servicesBreakpoints = {
    0: {
      slidesPerView: 1.75,
      spaceBetween: 20,
    },
    671: {
      slidesPerView: 2.25,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    1050: {
      slidesPerView: 3.25,
      spaceBetween: 20,
    },
    1267: {
      slidesPerView: 3.75,
      spaceBetween: 20,
    },
    1480: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
    1700: {
      slidesPerView: 5.5,
      spaceBetween: 20,
    },
  };

  @ViewChild('serviceSwiper') serviceSwiper!: ElementRef;
  dotsCount: any[] = [];

  //testimonials Section Variables
  @ViewChild('testimonialSwiper') testimonialSwiper!: ElementRef;
  @ViewChild('dot1') dot1!: ElementRef;
  @ViewChild('dot2') dot2!: ElementRef;
  @ViewChild('dot3') dot3!: ElementRef;
  @ViewChild('dot4') dot4!: ElementRef;
  testimonialsIndex: number = 0;
  dotHeight: number = 0;

  activeIndex: number = 0;

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });

    this._SiteContentService.getOurWorks().subscribe({
      next: (data) => {
        this.ourWork = data.data.map((category: any) => {
          return {
            id: category.id,
            categoryName: category.name,
            images: category.projects
              .filter((project: any) => project.image) // Ensure the image is not empty
              .map((project: any) => project.image),
          };
        });

        this.setProjectImagesByCategoryId(this.ourWork[0].id);
        this.eventCategoryName = this.ourWork[0].categoryName;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._OurServicesService.getServices().subscribe({
      next: (data) => {
        this.services = data.data;
        setTimeout(() => {
          this.dotsCount =
            this.serviceSwiper?.nativeElement.swiper.pagination.bullets;
        }, 100);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._SiteContentService.getHomeProductsCategories().subscribe({
      next: (response) => {
        this.productsCategories = response.data;
        this.activeCategory = response.data[0].category.id;
        this.activeCategoryProducts = response.data[0].products;
        this.activeCategoryName = response.data[0].category.name;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._SiteContentService.getSpecialReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews.data.slice(0, 4);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._SiteContentService.getPartners().subscribe({
      next: (partners) => {
        this.partners = partners.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSlideChange(swiperName: string): void {
    let swiper;
    if (swiperName === 'feedbacks') {
      swiper = this.testimonialSwiper?.nativeElement.swiper;
      this.activeIndex = swiper.activeIndex;
      this.setActive(swiper.activeIndex);
    } else if (swiperName === 'services') {
      swiper = this.serviceSwiper?.nativeElement.swiper;
      this.dotsCount = swiper.pagination.bullets;
    }
  }

  slideTo(index: number): void {
    const swiper = this.serviceSwiper?.nativeElement.swiper;
    swiper.slideTo(index);
  }

  updateDots(): void {
    const swiper = this.serviceSwiper?.nativeElement.swiper;
    this.dotsCount = swiper.pagination.bullets;
  }

  triggerNext(): void {
    this.ourWorkSwiper?.nativeElement.swiper.slideNext();
  }

  triggerPrev(): void {
    this.ourWorkSwiper?.nativeElement.swiper.slidePrev();
  }

  preventSlide(direction: string): boolean {
    if (direction === 'next') {
      return this.ourWorkSwiper?.nativeElement.swiper.isEnd ?? false;
    } else if (direction === 'prev') {
      return this.ourWorkSwiper?.nativeElement.swiper.isBeginning ?? false;
    }
    return false;
  }

  setActive(index: number): void {
    this.dotHeight = this.dot1.nativeElement.offsetHeight + 8;
    // Adjust transforms for vertical movement
    const transforms = [
      // For index 0 (default position, no movement)
      [0, 0, 0, 0],

      // For index 1 (move the dots up or down in a vertical direction)
      [this.dotHeight, -this.dotHeight, 0, 0],

      // For index 2 (further movement of dots in vertical direction)
      [this.dotHeight * 2, -this.dotHeight, -this.dotHeight, 0],

      // For index 3 (maximum movement for each dot)
      [this.dotHeight * 3, -this.dotHeight, -this.dotHeight, -this.dotHeight],
    ];

    // Apply vertical transform to each dot
    [this.dot1, this.dot2, this.dot3, this.dot4].forEach((dot, i) => {
      this.renderer.setStyle(
        dot.nativeElement,
        'transform',
        `translateY(${transforms[index][i] || 0}px)` // Use translateY for vertical movement
      );
    });
  }

  setActiveCategory(
    categoryId: number,
    products: any,
    categoryName: string
  ): void {
    console.log(categoryId);
    this.activeCategory = categoryId;
    this.activeCategoryProducts = products;
    this.activeCategoryName = categoryName;
  }

  setProjectImagesByCategoryId(id: number): void {
    const category = this.ourWork.find((category) => category.id === id);
    this.eventCategoryName = category.categoryName;
    this.eventImages = category?.images
      .map((img: any) => img)
      .filter((img: any) => img || []);
  }

  openWhatsApp(): void {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      this.message
    )}`;
    window.open(url, '_blank');
  }
}
