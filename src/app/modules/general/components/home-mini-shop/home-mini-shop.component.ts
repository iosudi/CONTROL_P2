import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-home-mini-shop',
  templateUrl: './home-mini-shop.component.html',
  styleUrls: ['./home-mini-shop.component.scss'],
})
export class HomeMiniShopComponent {
  constructor(
    private translate: TranslateService,
    private _ShopService: ShopService
  ) {}

  cities: any[] | undefined;
  selectedCity: any | undefined;
  @Input() products: any[] = [];
  @Input() activeCategory!: number;
  @Input() categoryName: string | undefined;

  ngOnInit() {}
}
