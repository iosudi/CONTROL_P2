import { Component, HostListener, inject, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  passwordVisibility: boolean = false;
  confirmPasswordVisibility: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  private modalService = inject(NgbModal);

  registerForm: FormGroup = this._FormBuilder.group(
    {
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\s!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>?]+$'
          ),
        ],
      ],
      confirm_password: [''],
    },
    { validators: [this.checkPasswordMatch] } as FormControlOptions
  );

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        if (this.activeModal) {
          this.activeModal.close();
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowWidth = (event.target as Window).innerWidth;
    if (this.activeModal && windowWidth <= 775) {
      this.activeModal.close();
    }
  }

  onSubmit(): void {
    if (this.registerForm.status === 'VALID') {
      this.auth.signUp(this.registerForm.value).subscribe({
        next: (data) => {
          this.openLoginForm();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Account created successfully',
            life: 2000,
          });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Failed to register your account',
            life: 2000,
          });
        },
      });
    }
  }

  checkPasswordMatch(group: FormGroup): void {
    let password = group.get('password');
    let confirmPassword = group.get('confirm_password');

    if (confirmPassword?.value == '') {
      confirmPassword?.setErrors({ required: true });
    } else if (confirmPassword?.value != password?.value) {
      confirmPassword?.setErrors({ notMatch: true });
    }
  }

  openLoginForm(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/login']);
    } else {
      this.modalService.open(LoginComponent, {
        centered: true,
        backdrop: 'static',
      });
      this.activeModal.close();
    }
  }

  togglePasswordVisibility(passwordInput: string): void {
    if (passwordInput === 'password') {
      this.passwordVisibility = !this.passwordVisibility;
    } else if (passwordInput == 'confirm_password') {
      this.confirmPasswordVisibility = !this.confirmPasswordVisibility;
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
