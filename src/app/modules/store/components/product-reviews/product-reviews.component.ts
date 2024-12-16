import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/shared/services/shop.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
})
export class ProductReviewsComponent {
  constructor(private fb: FormBuilder, private _ShopService: ShopService) {}

  @Input() productId!: number;

  reviewForm: FormGroup = this.fb.group({
    rating: ['', [Validators.required]],
    review: ['', [Validators.required]],
    reviewerName: ['', [Validators.required]],
    reviewerEmail: ['', [Validators.required, Validators.email]],
    productId: [''],
  });

  currentRate: number = 0;
  maxRate: number = 5;

  onSubmit(): void {
    this.reviewForm.get('productId')?.setValue(this.productId);
    if (this.reviewForm.status == 'VALID') {
      this._ShopService.addProductReview(this.reviewForm.value).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
      this.reviewForm.reset();
    }
  }

  updateRating(newRating: number): void {
    this.reviewForm.get('rating')?.setValue(newRating);
  }
}
