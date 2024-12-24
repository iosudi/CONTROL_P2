import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
})
export class ProductReviewsComponent {
  constructor(
    private fb: FormBuilder,
    private _ShopService: ShopService,
    private messageService: MessageService
  ) {}

  @Input() productId!: number;

  reviews: any[] = [];

  reviewForm: FormGroup = this.fb.group({
    rating: ['', [Validators.required]],
    review: ['', [Validators.required]],
    reviewerName: ['', [Validators.required]],
    reviewerEmail: ['', [Validators.required, Validators.email]],
    productId: [''],
  });

  currentRate: number = 0;
  maxRate: number = 5;

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    this._ShopService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.reviews = product.reviews;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit(): void {
    this.reviewForm.get('productId')?.setValue(this.productId);
    if (this.reviewForm.status == 'VALID') {
      this._ShopService.addProductReview(this.reviewForm.value).subscribe({
        next: () => {
          this.fetchReviews();
          this.messageService.add({
            severity: 'success',
            summary: 'success',
            detail: 'Review submitted successfully',
            life: 2000,
          });
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Something went wrong, try again later',
            life: 2000,
          });
        },
      });
      this.reviewForm.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Fill the required fields',
        life: 2000,
      });
    }
  }

  updateRating(newRating: number): void {
    this.reviewForm.get('rating')?.setValue(newRating);
  }
}
