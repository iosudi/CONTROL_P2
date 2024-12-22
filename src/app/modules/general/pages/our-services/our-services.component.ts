import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OurServicesService } from 'src/app/shared/services/our-services.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnInit {
  constructor(
    private route: Router,
    private _OurServicesService: OurServicesService,
    public translate: TranslateService
  ) {}
  direction: string = 'ltr'; // Default direction
  phoneNumber: string = '966547223203';
  message: string = 'مرحبًا، أود الاستفسار عن خدماتكم.';

  services: any[] = [];

  ngOnInit(): void {
    this._OurServicesService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      },
    });

    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  openServiceDetails(id: number) {
    this.route.navigate(['/services', id]);
  }

  openWhatsApp(): void {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(
      this.message
    )}`;
    window.open(url, '_blank');
  }
}
