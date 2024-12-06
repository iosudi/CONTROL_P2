import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-mini-shop',
  templateUrl: './home-mini-shop.component.html',
  styleUrls: ['./home-mini-shop.component.scss'],
})
export class HomeMiniShopComponent {
  cities: any[] | undefined;
  selectedCity: any | undefined;

  @Input() activeCategory: number = 1;
  @Input() products: any[] | undefined;
  @Input() categoryName: string | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
