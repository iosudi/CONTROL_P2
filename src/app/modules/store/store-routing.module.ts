import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'shop',
  //   component: ShopComponent,
  //   title: 'Shop - Ctrl+P for advertising and modern marketing',
  // },
  // {
  //   path: 'product-details',
  //   component: ProductDetailsComponent,
  //   title: 'Product - Ctrl+P for advertising and modern marketing',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
