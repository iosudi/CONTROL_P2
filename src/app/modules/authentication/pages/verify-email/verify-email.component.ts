import { Component, HostListener, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { CheckEmailComponent } from '../check-email/check-email.component';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  private modalService = inject(NgbModal);
  value: any;
  constructor(
    private _FormBuilder: FormBuilder,
    @Optional() public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  otpCodeForm: FormGroup = this._FormBuilder.group({
    otp: [''],
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

  onSubmit(): void {
    if (window.innerWidth <= 750) {
      this.router.navigate(['/auth/check-email']);
      this.activeModal.close();
    } else {
      this.modalService.open(CheckEmailComponent, {
        centered: true,
      });
      this.activeModal.close();
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
