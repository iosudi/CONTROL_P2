import { Component, OnInit } from '@angular/core';
import { SiteContentService } from 'src/app/shared/services/site-content.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  constructor(private _SiteContentService: SiteContentService) {}

  partners: any[] = [];

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this._SiteContentService.getPartners().subscribe((data) => {
      this.partners = data.data;
    });
  }
}
