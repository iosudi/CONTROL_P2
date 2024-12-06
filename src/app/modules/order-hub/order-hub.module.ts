import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderHubRoutingModule } from './order-hub-routing.module';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { MobileCartTableComponent } from './components/mobile-cart-table/mobile-cart-table.component';
import { DesktopCartTableComponent } from './components/desktop-cart-table/desktop-cart-table.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent, OrderDetailsComponent, MobileCartTableComponent, DesktopCartTableComponent],
  imports: [
    CommonModule,
    OrderHubRoutingModule,
    FormsModule,
    CheckboxModule,
    RadioButtonModule,
    BreadcrumbModule,
    SharedModule,
    TranslateModule,
  ],
})
export class OrderHubModule {}
