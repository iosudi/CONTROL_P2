import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  product: any = {};

  constructor(
    public translate: TranslateService,
    private ActivatedRoute: ActivatedRoute,
    private _ShopService: ShopService,
    private fb: FormBuilder,
    private _CartService: CartService,
    private messageService: MessageService
  ) {}

  productQuantity: number = 1;

  activeSection: string = 'product-reviews';
  direction: string = 'ltr'; // Default direction

  phoneNumber: string = '201121333510';
  message: string = 'لو سمحت عايز اشتري اللوحه دي, تعملها كام';

  cartDetails: any = {};

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  selectedMaterial: string = 'No material';
  selectedFrame: string = 'No frame';
  selectedSize: string = 'No size';

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

  fetchCartItems(): void {
    this._CartService.GetCartItemsWithDetails().subscribe({
      next: (items) => {
        console.log(items);
        this.cartDetails = items;
      },
      error: (error) => {
        console.log(error);
      },
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

  setProductSpecifications(
    material?: string,
    frame?: string,
    size?: string
  ): void {
    if (frame !== undefined && frame !== '') {
      this.selectedFrame = frame;
    }

    if (material !== undefined && material !== '') {
      this.selectedMaterial = material;
    }

    if (size !== undefined && size !== '') {
      this.selectedSize = size;
    }
  }

  addToCart(productId: number): void {
    const product = {
      productId: productId,
      quantity: this.productQuantity,
    };

    this._CartService.AddToCart(product).subscribe({
      next: (success) => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Product added to cart successfully',
          life: 3000,
        });
      },

      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Failed to add product to cart',
          life: 3000,
        });
      },
    });
  }

  updateQuantity(change: number): void {
    const newQuantity = this.productQuantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.productQuantity = newQuantity;
    }
  }

  openWhatsApp(): void {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      this.message
    )}`;
    window.open(url, '_blank');
  }
}
