import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-overlay',
  templateUrl: './cart-overlay.component.html',
  styleUrls: ['./cart-overlay.component.scss'],
})
export class CartOverlayComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private router: Router,
    private messageService: MessageService
  ) {}

  cartDetails: any = {};

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.closeCartOverlay();
      }
    });

    this.FetchData();
  }

  FetchData(): void {
    this._CartService.GetCartItemsWithDetails().subscribe({
      next: (data) => {
        this.cartDetails = data;
        console.log('Cart details fetched successfully:', this.cartDetails);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  RemoveFromCart(productId: number, quantity: number): void {
    let isRemoved: boolean = false;
    const product = {
      productId: productId,
      quantity: quantity,
    };

    this._CartService.RemoveFromCart(product).subscribe({
      next: (success) => {
        console.log('RemoveFromCart response:', success);
        if (success) {
          isRemoved = true;
          console.log('Product removed successfully:', productId);
          this.FetchData(); // Ensure this gets called
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product removed from cart successfully',
            life: 3000,
          });
        } else {
          console.log('Failed to remove product:', productId);
          this.FetchData();
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

  changeProductQuantity(productId: number, quantity: number) {
    this._CartService.updateQuantity(productId, quantity).subscribe({
      next: (response) => {
        if (response) {
          this.FetchData();
        }
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }

  closeCartOverlay(): void {
    this._CartService.openedCartOverlay.next(false);
  }
}
