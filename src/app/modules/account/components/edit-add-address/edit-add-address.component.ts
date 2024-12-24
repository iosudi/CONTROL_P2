import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CheckoutService } from 'src/app/shared/services/checkout.service';

@Component({
  selector: 'app-edit-add-address',
  templateUrl: './edit-add-address.component.html',
  styleUrls: ['./edit-add-address.component.scss'],
})
export class EditAddAddressComponent {
  constructor(
    private _CheckoutService: CheckoutService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  fname: string = '';
  lname: string = '';

  addressId: number = 0;

  addressForm: FormGroup = this.fb.group({
    id: [''],
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

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const id = parseInt(params['id'], 10);
        this.addressId = id;
        this.fetchAddress(id);
        if (isNaN(id)) {
          this.addressForm.removeControl('id'); // Remove 'id' control if addressId is NaN
        } else {
          this.addressForm.get('id')?.setValue(id); // Set 'id' control if addressId is valid
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  fetchAddress(id: number) {
    this._CheckoutService.getAddresses().subscribe({
      next: (addresses) => {
        const address = addresses.find((a: any) => a.id === id);
        if (address) {
          this.addressForm.patchValue(address);
          const nameParts = address.fullName.trim().split(' '); // Split by space
          this.fname = nameParts[0] || ''; // First name
          this.lname = nameParts.slice(1).join(' ') || '';
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit(): void {
    this.addressForm.get('fullName')?.setValue(`${this.fname} ${this.lname}`);
    if (this.addressForm.status === 'VALID') {
      if (!isNaN(this.addressId)) {
        this._CheckoutService.editAddress(this.addressForm.value).subscribe({
          next: () => {
            this.fetchAddress(this.addressId);
            this.addressForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'successfully updated your address',
              life: 2000,
            });
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Failed to update the address',
              life: 2000,
            });
          },
        });
      } else {
        this._CheckoutService.addAddress(this.addressForm.value).subscribe({
          next: () => {
            this.router.navigate(['/profile/addresses']);
            this.addressForm.reset();
            window.location.reload();
            this.messageService.add({
              severity: 'success',
              summary: 'success',
              detail: 'successfully added new address',
              life: 2000,
            });
          },
          error: (error) => {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: 'Failed to add new address',
              life: 2000,
            });
          },
        });
      }
    }
  }
}
