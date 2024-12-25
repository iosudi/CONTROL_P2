import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  isMobileView: boolean = false;

  orders: any[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _OrderService: OrderService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((result) => {
        this.isMobileView = result.matches;
      });

    this._OrderService.getPastOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error retrieving past orders:', error);
      },
    });
  }
}
