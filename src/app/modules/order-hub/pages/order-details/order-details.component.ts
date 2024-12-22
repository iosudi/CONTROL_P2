import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CheckoutService } from 'src/app/shared/services/checkout.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShopService } from 'src/app/shared/services/shop.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    public _CheckoutService: CheckoutService,
    public _OrderService: OrderService,
    public route: ActivatedRoute,
    public _UserService: UserService,
    public _ShopService: ShopService
  ) {}

  isShownTicket: boolean = true;
  direction: string = 'ltr';

  orderDetails: any = {};

  userInfo: any = {};

  currentStatus: string = '';

  steps = [
    { key: 'Created', icon: './assets/images/icons/mdi_send-check.svg' },
    { key: 'Packed', icon: './assets/images/icons/mdi_package-variant.svg' },
    {
      key: 'Shipped',
      icon: './assets/images/icons/mdi_truck-check-outline.svg',
    },
    { key: 'Delivered', icon: './assets/images/icons/mdi_home-outline.svg' },
  ];

  ngOnInit(): void {
    const currentLang =
      this.translate.currentLang || this.translate.getDefaultLang() || 'en';
    this.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    this.translate.onLangChange.subscribe((event) => {
      this.direction = event.lang === 'ar' ? 'rtl' : 'ltr';
    });

    this.initialize();
  }

  initialize(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.fetchOrderDetails(params['id']);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      },
    });
  }

  fetchOrderDetails(orderId: number): void {
    this._OrderService.getOrderDetails(orderId).subscribe({
      next: (order) => {
        this.orderDetails = order;

        const userId = order.userId;

        const productIds = order.orderItems.map((item: any) => item.productId);

        this.currentStatus = order.orderStatus;

        // Fetch user details
        this.getUserDetails(userId);

        // Fetch product details for each productId
        this.getProductDetails(productIds);

        console.log(order);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      },
    });
  }

  getUserDetails(userId: number): void {
    this._UserService.getUserById().subscribe({
      next: (user) => {
        this.userInfo = user;
        console.log(
          '🚀 ~ OrderDetailsComponent ~ this._UserService.getUserById ~ user:',
          user
        );
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      },
    });
  }

  getProductDetails(productIds: number[]): void {
    productIds.forEach((productId) => {
      this._ShopService.getProductById(productId).subscribe({
        next: (product) => {
          // Add the product details to each corresponding orderItem in orderDetails
          if (this.orderDetails && this.orderDetails.orderItems) {
            this.orderDetails.orderItems = this.orderDetails.orderItems.map(
              (item: any) => {
                if (item.productId === product.id) {
                  return {
                    ...item,
                    productDetails: product, // Merge product details into the order item
                  };
                }
                return item;
              }
            );
          }

          console.log('Updated Order Details:', this.orderDetails);
        },
        error: (error) => {
          console.error(
            `Error fetching product details for ID ${productId}:`,
            error
          );
        },
      });
    });
  }

  isStepActive(stepKey: string): boolean {
    const stepIndex = this.steps.findIndex((step) => step.key === stepKey);
    const currentIndex = this.steps.findIndex(
      (step) => step.key === this.currentStatus
    );
    return stepIndex <= currentIndex; // All previous steps and the current one should be active
  }

  hideTicket(): void {
    this.isShownTicket = false;
  }
}
