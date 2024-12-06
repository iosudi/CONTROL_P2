import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _CartService: CartService
  ) {
    this.checkActiveRoute(this.router.url);
  }

  isProfileActive: boolean = false;
  menuOpened: boolean = false;

  activeLink!: string;

  authLinks = [
    '/auth/login',
    '/auth/register',
    '/auth/OTP',
    '/auth/forgot-password',
    '/auth/check-email',
  ];

  accountLinks = [
    '/profile/dashboard',
    '/profile/account-details',
    '/profile/orders',
    '/profile/addresses',
    '/profile/addresses/add-address',
    '/profile/addresses/edit-address',
  ];

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.checkActiveRoute(event.urlAfterRedirects);
      }
    });

    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.isProfileActive =
        url.startsWith('/profile') && url !== '/profile/wishlist';
    });
  }

  openLinksMenu() {
    this.menuOpened = true;
  }

  checkActiveRoute(route: string) {
    this.activeLink = route;
    if (this.authLinks.includes(this.activeLink)) {
      this.activeLink = '/auth';
    } else if (this.accountLinks.includes(this.activeLink)) {
      this.activeLink = '/profile';
    }
  }

  onMenuStatusChange(status: boolean) {
    this.menuOpened = status;
    this.toggleBodyScroll();
  }

  checkCartOverlay(): boolean {
    return this._CartService.openedCartOverlay.getValue();
  }

  openCartOverlay(): void {
    if (!this.checkCartOverlay()) {
      this._CartService.openedCartOverlay.next(true);
    }
  }

  toggleBodyScroll(): void {
    document.body.style.overflow = this.menuOpened ? 'hidden' : 'auto';
  }
}
