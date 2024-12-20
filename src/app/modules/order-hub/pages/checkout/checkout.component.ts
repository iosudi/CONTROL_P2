import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { CheckoutService } from 'src/app/shared/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private _CheckoutService: CheckoutService
  ) {}
  ingredient!: string;

  fname: string = '';
  lname: string = '';

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

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
  }

  onSubmit(): void {
    this.billingAddressForm
      .get('fullName')
      ?.setValue(`${this.fname} ${this.lname}`);

    if (this.billingAddressForm.status === 'VALID') {
      this._CheckoutService
        .addAddress(this.billingAddressForm.value)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
