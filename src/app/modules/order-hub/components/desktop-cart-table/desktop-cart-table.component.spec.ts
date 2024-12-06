import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopCartTableComponent } from './desktop-cart-table.component';

describe('DesktopCartTableComponent', () => {
  let component: DesktopCartTableComponent;
  let fixture: ComponentFixture<DesktopCartTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktopCartTableComponent]
    });
    fixture = TestBed.createComponent(DesktopCartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
