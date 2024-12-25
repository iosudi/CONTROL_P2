import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private _CheckoutService: CheckoutService,
    private _CartService: CartService,
    private _OrderService: OrderService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  cartDetails: any = {};
  method!: string;

  fname: string = '';
  lname: string = '';

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  errMsg: string = '';

  userHasAddresses: boolean = false; // To track if user has addresses
  firstAddress: any; // To store the first address

  billingAddressForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    companyName: [''],
    country: ['', Validators.required],
    streetAddress: ['', Validators.required],
    billingAddress: [''],
    addressText: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    phone: ['', Validators.required],
    note: [''],
  });

  ngOnInit() {
    this.items = [{ label: 'Checkout' }];

    this.home = { label: 'Home Page', routerLink: '/' };

    this.fetchCartItems();

    this._CheckoutService.getAddresses().subscribe({
      next: (addresses) => {
        if (addresses && addresses.length > 0) {
          this.userHasAddresses = true;
          this.firstAddress = addresses[0];
          console.log(this.firstAddress);
          const nameParts = this.firstAddress.fullName.trim().split(' '); // Split by space
          this.fname = nameParts[0] || ''; // First name
          this.lname = nameParts.slice(1).join(' ') || '';
          // Autofill the form with the first address
          this.billingAddressForm.patchValue({
            fullName: this.firstAddress.fullName,
            companyName: this.firstAddress.companyName,
            country: this.firstAddress.country,
            streetAddress: this.firstAddress.streetAddress,
            billingAddress: this.firstAddress.billingAddress,
            addressText: this.firstAddress.addressText,
            city: this.firstAddress.city,
            state: this.firstAddress.state,
            zipCode: this.firstAddress.zipCode,
            phone: this.firstAddress.phone,
            note: '',
          });
        } else {
          this.userHasAddresses = false;
        }

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching addresses:', error);
      },
    });
  }

  fetchCartItems(): void {
    this._CartService.GetCartItemsWithDetails().subscribe({
      next: (items) => {
        this.cartDetails = items;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getLastOrderId(): Observable<number> {
    return this._OrderService.getPastOrders().pipe(
      map((orders) => (orders.length > 0 ? orders[orders.length - 1].id : -1)),
      catchError((error) => {
        console.error(error);
        return of(-1);
      })
    );
  }

  onSubmit(): void {
    this.billingAddressForm
      .get('fullName')
      ?.setValue(`${this.fname} ${this.lname}`);

    if (this.billingAddressForm.status === 'VALID') {
      if (this.userHasAddresses) {
        // Fetch the first address of the user
        this._CheckoutService.getAddresses().subscribe((addresses) => {
          const firstAddress = addresses[0]; // Assuming the first address is at index 0

          // Check if the address in the form is different from the first address
          if (
            this.billingAddressForm.get('fullName')?.value !==
              firstAddress.fullName ||
            this.billingAddressForm.get('companyName')?.value !==
              firstAddress.companyName ||
            this.billingAddressForm.get('country')?.value !==
              firstAddress.country ||
            this.billingAddressForm.get('streetAddress')?.value !==
              firstAddress.streetAddress ||
            this.billingAddressForm.get('city')?.value !== firstAddress.city ||
            this.billingAddressForm.get('state')?.value !==
              firstAddress.state ||
            this.billingAddressForm.get('zipCode')?.value !==
              firstAddress.zipCode ||
            this.billingAddressForm.get('phone')?.value !== firstAddress.phone
          ) {
            // If the address in the form is different, update the address
            if (!this.billingAddressForm.contains('id')) {
              this.billingAddressForm.addControl('id', this.fb.control(''));
            }

            this.billingAddressForm.get('id')?.setValue(firstAddress.id);

            this._CheckoutService
              .editAddress(this.billingAddressForm.value)
              .subscribe({
                next: () => {
                  console.log('Address updated successfully');
                  this.proceedWithCheckout(); // Proceed with checkout after updating address
                },
                error: (error) => {
                  console.error('Error updating address:', error);
                },
              });
          } else {
            // If the address in the form matches the first address, proceed with checkout directly
            this.proceedWithCheckout();
          }
        });
      } else {
        this._CheckoutService
          .addAddress(this.billingAddressForm.value)
          .subscribe({
            next: (response) => {
              this.proceedWithCheckout();
            },
            error: (error) => {
              console.error(error);
            },
          });
      }
    }
  }

  proceedWithCheckout() {
    if (this.method == 'cash') {
      this._CheckoutService.CheckoutCOD().subscribe({
        next: (response) => {
          this.getLastOrderId().subscribe((lastOrderId) => {
            this.router.navigate(['/order-details', lastOrderId]);
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else if (this.method == 'card') {
      this.getLastOrderId().subscribe((lastOrderId) => {
        this._CheckoutService.CheckoutCard(lastOrderId + 1).subscribe({
          next: (response) => {
            console.log(response);
            console.log(lastOrderId);
            window.location.href = response.url;
          },
          error: (error) => {
            console.log(error);
          },
        });
      });
    } else {
      this.errMsg = 'Please choose a payment method';
      return;
    }
  }
}
