import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
})
export class ProductReviewsComponent {
  constructor(private _FormBuilder: FormBuilder) {}

  reviewForm = this._FormBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    review: ['', Validators.required],
    rating: [0, Validators.required],
  });

  currentRate: number = 0;
  maxRate: number = 5;

  onSubmit(): void {
    if (this.reviewForm.status == 'VALID') {
      console.log(this.reviewForm.value);
      this.reviewForm.reset();
    }
  }

  updateRating(newRate: number): void {
    this.currentRate = newRate;
  }
}
