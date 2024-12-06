import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    title: 'Your cart - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Checkout - Ctrl+P for advertising and modern marketing',
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent,
    title: 'Order Details - Ctrl+P for advertising and modern marketing',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHubRoutingModule {}
