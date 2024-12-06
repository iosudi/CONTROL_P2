import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OurServicesService } from 'src/app/shared/services/our-services.service';

@Component({
  selector: 'app-services-details',
  templateUrl: './services-details.component.html',
  styleUrls: ['./services-details.component.scss'],
})
export class ServicesDetailsComponent implements OnInit {
  constructor(
    private _OurServicesService: OurServicesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  home: MenuItem | undefined;
  activeServiceId!: number;

  serviceDetails: any;
  services: any[] = [];

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.home = { label: 'Home', routerLink: '/home' };

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        if (params.get('id')) {
          this.initializeServiceDetails(Number(params.get('id')));
          this.activeServiceId = Number(params.get('id'));

          this._OurServicesService.getServices().subscribe({
            next: (services) => {
              this.services = services.data.filter(
                (service: any) => service.id != this.activeServiceId
              );
            },
            error: (error) => {
              console.error('Error fetching services:', error);
            },
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  initializeServiceDetails(id: number) {
    this._OurServicesService.getServiceById(id).subscribe((data) => {
      this.serviceDetails = data.data;
    });
  }
}
