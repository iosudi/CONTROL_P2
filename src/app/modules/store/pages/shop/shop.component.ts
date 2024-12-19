import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { QuickViewComponent } from '../../components/quick-view/quick-view.component';
import { ShopService } from './../../../../shared/services/shop.service';
import { WishlistService } from './../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  private modalService = inject(NgbModal);
  private audio = new Audio();

  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private _ShopService: ShopService,
    private _CartService: CartService,
    private messageService: MessageService,
    private _WishlistService: WishlistService
  ) {
    this.audio.src = '../../../../../assets/easter eggs/sabqwla7q.mp3'; // Path to your audio file
    this.audio.load();
  }

  rangeValues: number[] = [0, 100];
  direction: string = 'ltr'; // Default direction
  pageSize: number = 8;
  currentPage = 1;
  filtersOpened: boolean = false;
  selectedFilters: any[] = [];

  filteredProducts: any[] = []; // List of products to display
  selectedCategory: string = 'all'; // Default category selection
  categories: any[] = [];

  filterOptions = [
    {
      title: 'Size',
      options: [
        { label: 'Small', quantity: 10, isChecked: false },
        { label: 'Medium', quantity: 15, isChecked: false },
        { label: 'Large', quantity: 8, isChecked: false },
      ],
    },
    {
      title: 'Color',
      options: [
        { label: 'Red', quantity: 12, isChecked: false },
        { label: 'Blue', quantity: 9, isChecked: false },
        { label: 'Green', quantity: 5, isChecked: false },
      ],
    },
  ];

  cities: any[] | undefined;
  selectedCity: any | undefined;
  isHorizontal: boolean = false;
  activeGridStyle: string = 'vertical-small';
  products: any = [];

  categoriesBreakpoints = {
    0: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },
    767: {
      slidesPerView: 2.1,
      spaceBetween: 20,
    },
    1199: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  };

  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.initializeFiltersFromQueryParams();
    this.fetchData();

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  fetchData(): void {
    this._ShopService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._ShopService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  initializeFiltersFromQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.filterOptions.forEach((filter) => {
        const filterKey = filter.title.toLowerCase();
        const selectedOptions = params[filterKey];

        if (selectedOptions) {
          const selectedLabels = selectedOptions.split(','); // Split the query param string

          // Mark options as checked if they match the selected labels
          filter.options.forEach((option) => {
            if (selectedLabels.includes(option.label)) {
              option.isChecked = true;
            }
          });
        }
      });

      const priceMin = params['price_min']
        ? parseInt(params['price_min'], 10)
        : this.rangeValues[0];
      const priceMax = params['price_max']
        ? parseInt(params['price_max'], 10)
        : this.rangeValues[1];

      this.rangeValues = [priceMin, priceMax];
    });
    this.updateSelectedFiltersAndQueryParams();
  }

  addToCart(productId: number, e: MouseEvent): void {
    e.stopPropagation();
    const product = {
      productId: productId,
      quantity: 1,
    };

    this._CartService.AddToCart(product).subscribe((success) => {
      if (success) {
        if (productId == 28) {
          this.playSong();
        }
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Product added to cart successfully',
          life: 3000,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Failed to add product to cart',
          life: 3000,
        });
      }
    });
  }

  // filterByCategory(category: string): void {
  //   this.selectedCategory = category;

  //   if (category === 'all') {
  //     // Show all products
  //     this.filteredProducts = [...this.products];
  //   } else {
  //     // Filter products locally
  //     this.filteredProducts = this.products.filter(
  //       (product:any) => product.category[0] === category
  //     );
  //   }
  // }

  setDirection(): void {
    this.direction = this.translate.instant('dir') === 'rtl' ? 'rtl' : 'ltr';
  }

  setViewMode(mode: string, gridStyle?: string) {
    this.isHorizontal = mode === 'horizontal';
    if (gridStyle) {
      this.activeGridStyle = gridStyle;
    }
  }

  getGridClasses(): string {
    if (this.isHorizontal) {
      return 'col-12';
    } else {
      return this.activeGridStyle === 'vertical-large'
        ? 'col-xl-3 col-lg-4 col-sm-6'
        : 'col-xl-4 col-lg-4 col-sm-6';
    }
  }

  updatePriceRangeFilter(): void {
    const rangeParams = {
      ['price_min']: this.rangeValues[0], // Minimum value from range slider
      ['price_max']: this.rangeValues[1], // Maximum value from range slider
    };

    this.updateQueryParamsWithSelectedFilters(rangeParams);
  }

  updateSelectedFiltersAndQueryParams(): void {
    // Update the selected filters based on user input
    this.selectedFilters = this.filterOptions.flatMap((filter) =>
      filter.options
        .filter((option) => option.isChecked)
        .map((option) => ({
          title: filter.title,
          label: option.label,
        }))
    );

    // Add the selected filters to the query parameters
    this.updateQueryParamsWithSelectedFilters();
  }

  updateQueryParamsWithSelectedFilters(rangeParams?: {
    [key: string]: number;
  }): void {
    const params: { [key: string]: string } = {};

    // Collect checked options for each filter
    this.filterOptions.forEach((filter) => {
      const checkedOptions = filter.options
        .filter((option) => option.isChecked)
        .map((option) => option.label);

      if (checkedOptions.length > 0) {
        // If there are selected options, add them to the params object
        params[filter.title.toLowerCase()] = checkedOptions.join(',');
      }
    });

    if (rangeParams) {
      params['price_min'] = rangeParams['price_min'].toString();
      params['price_max'] = rangeParams['price_max'].toString();
    }

    // Update the query parameters with the selected filters
    this.applyUpdatedQueryParams(params);
  }

  applyUpdatedQueryParams(params: { [key: string]: string }): void {
    this.route.queryParams.subscribe((currentParams) => {
      // Merge current params with new ones
      const updatedParams = { ...currentParams, ...params };

      // Remove any filters that no longer have selected options
      Object.keys(currentParams).forEach((key) => {
        if (!(key in params) && key !== 'price_min' && key !== 'price_max') {
          delete updatedParams[key];
        }
      });

      // Update the URL with the final query parameters
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: updatedParams,
      });
    });
  }

  removeFilter(index: number): void {
    const filterToRemove = this.selectedFilters[index];

    this.selectedFilters.splice(index, 1);

    const filter = this.filterOptions.find(
      (f) => f.title === filterToRemove.title
    );
    if (filter) {
      const option = filter.options.find(
        (opt) => opt.label === filterToRemove.label
      );
      if (option) {
        option.isChecked = false;
      }
    }

    // Update the URL query parameters
    this.updateQueryParamsWithSelectedFilters();
  }

  clearAllFilters(): void {
    this.selectedFilters = [];

    this.filterOptions.forEach((filter) => {
      filter.options.forEach((option) => {
        option.isChecked = false;
      });
    });

    // Update the URL query parameters
    this.updateQueryParamsWithSelectedFilters();
  }

  openFiltersMenu() {
    this.filtersOpened = true;
  }

  onMenuStatusChange(status: any) {
    this.filtersOpened = status;
    this.toggleBodyScroll();
  }

  openQuickViewModal() {
    this.modalService.open(QuickViewComponent, { fullscreen: true });
  }

  pageChanged(event: any): void {}

  toggleBodyScroll(): void {
    document.body.style.overflow = this.filtersOpened ? 'hidden' : 'auto';
  }

  playSong() {
    this.audio.play();
  }

  addToWishlist(productId: number, e: MouseEvent): void {
    e.stopPropagation();

    this._WishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Product added to wishlist successfully',
          life: 3000,
        });
      },
      error: (error) => {
        console.log(
          '🚀 ~ ShopComponent ~ this._WishlistService.addToWishlist ~ error:',
          error
        );
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Failed to add product to wishlist',
          life: 3000,
        });
      },
    });
  }
}
