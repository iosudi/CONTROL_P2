import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { EditAddAddressComponent } from './components/edit-add-address/edit-add-address.component';
import { AccountDashboardComponent } from './pages/account-dashboard/account-dashboard.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AccountDashboardComponent,
    ProfileComponent,
    AccountDetailsComponent,
    OrdersComponent,
    AddressesComponent,
    WishlistComponent,
    EditAddAddressComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    DropdownModule,
    FormsModule,
    SharedModule,
  ],
})
export class AccountModule {}
