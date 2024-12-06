import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingDeliveryComponent } from './shipping-delivery.component';

describe('ShippingDeliveryComponent', () => {
  let component: ShippingDeliveryComponent;
  let fixture: ComponentFixture<ShippingDeliveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingDeliveryComponent]
    });
    fixture = TestBed.createComponent(ShippingDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
