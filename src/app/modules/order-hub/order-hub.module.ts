import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'src/app/shared/shared.module';
import { DesktopCartTableComponent } from './components/desktop-cart-table/desktop-cart-table.component';
import { MobileCartTableComponent } from './components/mobile-cart-table/mobile-cart-table.component';
import { OrderHubRoutingModule } from './order-hub-routing.module';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

@NgModule({
  declarations: [
    CartComponent,
    CheckoutComponent,
    OrderDetailsComponent,
    MobileCartTableComponent,
    DesktopCartTableComponent,
  ],
  imports: [
    CommonModule,
    OrderHubRoutingModule,
    FormsModule,
    CheckboxModule,
    RadioButtonModule,
    BreadcrumbModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class OrderHubModule {}
