import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  isMobileView: boolean = false;

  orders = [
    {
      id: 12345,
      date: 'September 30, 2024',
      status: 'On hold',
      total: 123,
    },
    {
      id: 12346,
      date: 'October 1, 2024',
      status: 'Completed',
      total: 250,
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => {
        this.isMobileView = result.matches;
      });
  }
}
