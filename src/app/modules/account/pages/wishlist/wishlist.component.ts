import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private _WishlistService: WishlistService,
    private _CartService: CartService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {}

  cities: any[] | undefined;

  selectedCity: any | undefined;

  wishlistItems: any[] = [];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.fetchData();
  }

  fetchData(): void {
    this._WishlistService.getWishlistItems().subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(productId: number, e: MouseEvent): void {
    e.stopPropagation();
    const product = {
      productId: productId,
      quantity: 1,
    };

    this._CartService.AddToCart(product).subscribe((success) => {
      if (success) {
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

  removeFromWishlist(productId: number, e: MouseEvent): void {
    e.stopPropagation();

    this._WishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.fetchData();
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Product removed from wishlist successfully',
          life: 3000,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Failed to remove product from wishlist',
          life: 3000,
        });
      },
    });
  }
}
