import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent {
  isChildRouteActive = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Listen to route changes
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      // Check if the current route includes 'edit-address' or 'add-address'
      this.isChildRouteActive =
        currentRoute.includes('edit-address') ||
        currentRoute.includes('add-address');
    });
  }
}
