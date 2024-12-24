import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  currentPasswordVisibility: boolean = false;
  newPasswordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;

  email: string = '';
  userInfo: FormGroup;

  constructor(
    private _UserService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.userInfo = this.fb.group({
      firstName: [''],
      lastName: [''],
      displayName: [''],
      email: [''],
      oldPassword: [''],
      newPassword: [''],
      confirmPassword: [''],
      passwordConfirmation: [false], // Initialize with false
    });

    // Watch for changes in the 'newPassword' and 'confirmPassword' fields
    this.userInfo.valueChanges.subscribe(() => {
      this.checkPasswordMatch(); // Check password match whenever any value changes
    });
  }

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(): void {
    this._UserService.getUserById().subscribe({
      next: (user) => {
        this.userInfo.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          displayName: user.displayName,
          email: user.email,
        });

        this.email = user.email;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit(): void {
    if (this.userInfo.status === 'VALID') {
      const { oldPassword, newPassword, passwordConfirmation } =
        this.userInfo.value;

      if (oldPassword && newPassword && passwordConfirmation) {
        this._UserService
          .changePassword({ oldPassword, newPassword, passwordConfirmation })
          .subscribe({
            next: () => {},
            error: (error) => {
              console.error('Error changing password:', error);
            },
            complete: () => {
              this.updateUserInfo();
            },
          });
      } else {
        this.updateUserInfo();
      }
    }
  }

  updateUserInfo(): void {
    this._UserService.updateUserInfo(this.userInfo.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'User data updated successfully',
          life: 2000,
        });
        this.fetchUserInfo();
      },
      error: (error) => {
        console.error('Error updating user details:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Error updating user data',
          life: 2000,
        });
      },
    });
  }

  checkPasswordMatch(): void {
    const newPassword = this.userInfo.get('newPassword')?.value;
    const confirmPassword = this.userInfo.get('confirmPassword')?.value;

    if (newPassword && confirmPassword) {
      this.userInfo
        .get('passwordConfirmation')
        ?.setValue(newPassword === confirmPassword); // Set to true if they match, false otherwise
    } else {
      this.userInfo.get('passwordConfirmation')?.setValue(false); // Set to false if not matching or empty
    }
  }

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
