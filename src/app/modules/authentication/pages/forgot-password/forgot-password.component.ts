import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { RegisterComponent } from '../register/register.component';
import { VerifyEmailComponent } from '../verify-email/verify-email.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  private modalService = inject(NgbModal);

  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  forgotPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required]],
  });

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

  onSubmit(): void {
    this.modalService.open(VerifyEmailComponent, {
      centered: true,
      backdrop: 'static',
      scrollable: true,
    });
    this.activeModal.close();
  }

  close(): void {
    this.activeModal.close();
  }
}
