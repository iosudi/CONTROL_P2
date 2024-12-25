import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-desktop-cart-table',
  templateUrl: './desktop-cart-table.component.html',
  styleUrls: ['./desktop-cart-table.component.scss'],
})
export class DesktopCartTableComponent {
  constructor(
    private _CartService: CartService,
    private messageService: MessageService,
    private cd: ChangeDetectorRef
  ) {}

  cartDetails: any = {};

  @Output() cartItemsChanged = new EventEmitter<any>();

  ngOnInit(): void {
    this.fetchCartItems();
  }
  fetchCartItems(): void {
    this._CartService.GetCartItemsWithDetails().subscribe({
      next: (items) => {
        console.log(items);
        this.cartDetails = items;
        this.cd.detectChanges();
        this.cartItemsChanged.emit(this.cartDetails);
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

  changeProductQuantity(productId: number, quantity: number) {
    this._CartService.updateQuantity(productId, quantity).subscribe({
      next: (response) => {
        if (response) {
          this.fetchCartItems();
        }
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }
}
