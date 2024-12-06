import { Component } from '@angular/core';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent {
  currentPasswordVisibility: boolean = false;
  newPasswordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'current_password') {
      this.currentPasswordVisibility = !this.currentPasswordVisibility;
    } else if (passwordInput == 'new_password') {
      this.newPasswordVisibility = !this.newPasswordVisibility;
    } else if (passwordInput == 'confirm_password') {
      this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
    }
  }
}
