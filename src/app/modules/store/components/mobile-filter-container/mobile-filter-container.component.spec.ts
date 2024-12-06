import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFilterContainerComponent } from './mobile-filter-container.component';

describe('MobileFilterContainerComponent', () => {
  let component: MobileFilterContainerComponent;
  let fixture: ComponentFixture<MobileFilterContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileFilterContainerComponent]
    });
    fixture = TestBed.createComponent(MobileFilterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
