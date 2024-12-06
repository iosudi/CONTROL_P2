import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAddAddressComponent } from './components/edit-add-address/edit-add-address.component';
import { AccountDashboardComponent } from './pages/account-dashboard/account-dashboard.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'My account - Ctrl+P for advertising and modern marketing',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: AccountDashboardComponent,
      },
      {
        path: 'account-details',
        component: AccountDetailsComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'addresses',
        component: AddressesComponent,
        children: [
          {
            path: 'edit-address',
            component: EditAddAddressComponent,
          },
          {
            path: 'add-address',
            component: EditAddAddressComponent,
          },
        ],
      },

      {
        path: 'wishlist',
        component: WishlistComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
