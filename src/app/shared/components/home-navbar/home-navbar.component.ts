import { Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/core/services/language-service.service';
import { LoginComponent } from 'src/app/modules/authentication/pages/login/login.component';
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

  direction: string = 'ltr'; // Default direction

  private modalService = inject(NgbModal);

  cartOverlayOpened: boolean = false;
  currentLanguage: string = 'ar';
  ngOnInit(): void {
    this._CartService.openedCartOverlay.subscribe({
      next: (status) => {
        this.cartOverlayOpened = status;
      },
    });

    const savedLang = this._LanguageService.getLanguage();
    this.currentLanguage = savedLang;
    this.translate.use(savedLang); // Set the language in the translation service
  }

  openLoginDialog() {
    const modalRef = this.modalService.open(LoginComponent, {
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

    // Reload the page to fetch new data with the updated language

    window.location.reload(); // Reload the page
  }

  openCartOverlay(): void {
    this.cartOverlayOpened = true;
  }
}
