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

  solutions_images = [
    './assets/images/our-services/1.png',
    './assets/images/our-services/2.png',
    './assets/images/our-services/3.png',
    './assets/images/our-services/4.png',
    './assets/images/our-services/5.png',
    './assets/images/our-services/6.png',
    './assets/images/our-services/7.png',
    './assets/images/our-services/8.png',
  ];

  services: any[] = [];

  ngOnInit(): void {
    this._OurServicesService.getServices().subscribe({
      next: (services) => {
        this.services = services.data;
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
