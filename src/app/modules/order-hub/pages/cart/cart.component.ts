import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { SiteContentService } from 'src/app/shared/services/site-content.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(
    private _SiteContentService: SiteContentService,
    private _CartService: CartService,
    private messageService: MessageService
  ) {}

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  partners: any[] = [];
  cartDetails: any = {};

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.items = [{ label: 'Cart' }];
    this.home = { label: 'Home Page', routerLink: '/' };

    this._SiteContentService.getPartners().subscribe({
      next: (partners) => {
        this.partners = partners.data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.fetchCartItems();
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

  RemoveFromCart(productId: number, quantity: number): void {
    const product = {
      productId: productId,
      quantity: quantity,
    };

    this._CartService.RemoveFromCart(product).subscribe({
      next: (success) => {
        if (success) {
          this.fetchCartItems(); // Ensure this gets called
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product removed from cart successfully',
            life: 3000,
          });
        } else {
          console.log('Failed to remove product:', productId);
          this.fetchCartItems();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to remove product from cart',
            life: 3000,
          });
        }
      },
      error: (error) => {
        console.error('RemoveFromCart error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while removing the product',
          life: 3000,
        });
      },
    });
  }

  onCartItemsChanged(items: any[]): void {
    this.cartDetails = items;
    console.log('Updated cart items:', this.cartDetails);
  }
}
