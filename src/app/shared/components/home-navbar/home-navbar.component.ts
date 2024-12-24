import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/core/services/language-service.service';
import { LoginComponent } from 'src/app/modules/authentication/pages/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentication/pages/register/register.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    public translate: TranslateService,
    private _LanguageService: LanguageServiceService
  ) {}

  direction: string = 'ltr';

  private modalService = inject(NgbModal);

  cartOverlayOpened: boolean = false;
  currentLanguage: string = 'ar';

  collapsed: boolean = true;

  userLoggedIn: boolean = localStorage.getItem('token') ? true : false;

  ngOnInit(): void {
    this._CartService.openedCartOverlay.subscribe({
      next: (status) => {
        this.cartOverlayOpened = status;
      },
    });

    const savedLang = this._LanguageService.getLanguage();
    this.currentLanguage = savedLang;
    this.translate.use(savedLang);

    if (savedLang == 'ar') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }
  }

  openLoginDialog() {
    const modalRef = this.modalService.open(LoginComponent, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
    });
  }

  openRegisterDialog() {
    const modalRef = this.modalService.open(RegisterComponent, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
    });
  }

  changeLanguage(): void {
    // Toggle between 'en' and 'ar'
    const newLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
    this._LanguageService.setLanguage(newLanguage); // Update the language
    this.currentLanguage = newLanguage;

    window.location.reload(); // Reload the page
  }

  openCartOverlay(): void {
    this.cartOverlayOpened = true;
  }

  toggleMenu(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userLoggedIn = false;
    this.toggleMenu();
    window.location.reload(); // Reload the page
  }
}
