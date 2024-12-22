import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
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
    private _CartService: CartService
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

  onCartItemsChanged(items: any[]): void {
    this.cartDetails = items;
    console.log('Updated cart items:', this.cartDetails);
  }
}
