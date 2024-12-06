import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { SharedModule } from 'src/app/shared/shared.module';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { MobileFilterContainerComponent } from './components/mobile-filter-container/mobile-filter-container.component';
import { ProductDescriptionComponent } from './components/product-description/product-description.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { QuickViewComponent } from './components/quick-view/quick-view.component';
import { ShippingDeliveryComponent } from './components/shipping-delivery/shipping-delivery.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShopComponent } from './pages/shop/shop.component';
import { StoreRoutingModule } from './store-routing.module';
registerSwiperElements();

@NgModule({
  declarations: [
    ShopComponent,
    QuickViewComponent,
    ProductDetailsComponent,
    ProductDescriptionComponent,
    ProductReviewsComponent,
    ShippingDeliveryComponent,
    MobileFilterContainerComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SliderModule,
    FormsModule,
    CheckboxModule,
    DropdownModule,
    NgxPaginationModule,
    BreadcrumbModule,
    NgbRatingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StoreModule {}
