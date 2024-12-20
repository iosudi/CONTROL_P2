import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
    private _WishlistService: WishlistService
  ) {}

  cities: any[] | undefined;

  selectedCity: any | undefined;

  wishlistItems: any[] = [];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.fetchData();
  }

  fetchData(): void {
    this._WishlistService.getWishlistItems().subscribe({
      next: (items) => {
        this.wishlistItems = items;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
