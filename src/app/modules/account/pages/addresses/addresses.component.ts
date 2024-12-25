import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from 'src/app/shared/services/checkout.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  isChildRouteActive = false;

  addresses: any[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _CheckoutService: CheckoutService,
    private cd: ChangeDetectorRef
  ) {
    // Listen to route changes
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      // Check if the current route includes 'edit-address' or 'add-address'
      this.isChildRouteActive =
        currentRoute.includes('edit-address') ||
        currentRoute.includes('add-address');
    });
  }

  ngOnInit(): void {
    this._CheckoutService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        this.cd.detectChanges();
      },
      error: (error) => {
        // Handle the error
      },
    });
  }
}
