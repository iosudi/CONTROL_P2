import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCartTableComponent } from './mobile-cart-table.component';

describe('MobileCartTableComponent', () => {
  let component: MobileCartTableComponent;
  let fixture: ComponentFixture<MobileCartTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileCartTableComponent]
    });
    fixture = TestBed.createComponent(MobileCartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
