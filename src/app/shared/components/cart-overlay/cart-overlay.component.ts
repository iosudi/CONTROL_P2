import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-overlay',
  templateUrl: './cart-overlay.component.html',
  styleUrls: ['./cart-overlay.component.scss'],
})
export class CartOverlayComponent implements OnInit {
  constructor(private _CartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.closeCartOverlay();
      }
    });
  }

  closeCartOverlay(): void {
    this._CartService.openedCartOverlay.next(false);
  }
}
