import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SiteContentService } from 'src/app/shared/services/site-content.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(private _SiteContentService: SiteContentService) {}

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  partners: any[] = [];

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
  }
}
