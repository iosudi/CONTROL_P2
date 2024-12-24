import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}
  private modalService = inject(NgbModal);

  passwordVisibility: boolean = false;
  errorMessage: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  loginForm: FormGroup = this._FormBuilder.group({
    userName: [''],
    password: [''],
  });

  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      this.auth.login(this.loginForm.value).subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'successfully logged in',
            life: 2000,
          });
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Failed to login to your account',
            life: 2000,
          });
        },
      });
    }
  }

  openSignupForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/register']);
      this.activeModal.close();
    } else {
      this.modalService.open(RegisterComponent, {
        centered: true,
        backdrop: 'static',
        scrollable: true,
      });
      this.activeModal.close();
    }
  }

  value: any;

  openForgotPasswordForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/forgot-password']);
      this.activeModal.close();
    } else {
      this.modalService.open(ForgotPasswordComponent, {
        centered: true,
        backdrop: 'static',
      });
      this.activeModal.close();
    }
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
