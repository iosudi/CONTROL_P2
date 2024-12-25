import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-mobile-cart-table',
  templateUrl: './mobile-cart-table.component.html',
  styleUrls: ['./mobile-cart-table.component.scss'],
})
export class MobileCartTableComponent {
  constructor(
    private _CartService: CartService,
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
        this.cartItemsChanged.emit(this.cartDetails);
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  removeCartItem(id: number): void {
    this._CartService.RemoveFromCart(id).subscribe({
      next: (success) => {
        console.log('RemoveFromCart response:', success);
      },
      error: (error) => {
        console.log(error);
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
