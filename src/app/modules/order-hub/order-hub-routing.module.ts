import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'cart',
  //   component: CartComponent,
  //   title: 'Your cart - Ctrl+P for advertising and modern marketing',
  // },
  // {
  //   path: 'checkout',
  //   component: CheckoutComponent,
  //   title: 'Checkout - Ctrl+P for advertising and modern marketing',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderHubRoutingModule {}
