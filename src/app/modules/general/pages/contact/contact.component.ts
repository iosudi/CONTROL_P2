import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SiteInfoService } from 'src/app/shared/services/site-info.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private fb: FormBuilder,
    private _SiteInfoService: SiteInfoService,
    private messageService: MessageService
  ) {}
  direction: string = 'ltr';
  phoneNumber: string = '966547223203';
  message: string = 'مرحبًا، أود الاستفسار عن خدماتكم.';

  contactForm: FormGroup = this.fb.group({
    full_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(15)]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  ngOnInit(): void {
    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  onSubmit(): void {
    if (this.contactForm.status === 'VALID') {
      this._SiteInfoService.contact(this.contactForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.contactForm.reset();
          if (this.direction === 'rtl') {
            this.messageService.add({
              severity: 'success',
              summary: 'بنجاح',
              detail: 'تم ارسال رسالتك ',
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Your message has been sent',
            });
          }
        },
        error: (error) => {
          console.log(error);
          if (this.direction === 'rtl') {
            this.messageService.add({
              severity: 'error',
              summary: 'فشل',
              detail: 'برجاء المحاوله وقت لاحق',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong, try again later',
            });
          }
        },
      });
    }
  }

  getWhatsAppLink(): string {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      this.message
    )}`;
  }

  callPhoneNumber() {
    window.location.href = 'tel:+966547223203';
  }

  sendEmail() {
    window.location.href = 'mailto:info@ctrlplusp.com';
  }
}
