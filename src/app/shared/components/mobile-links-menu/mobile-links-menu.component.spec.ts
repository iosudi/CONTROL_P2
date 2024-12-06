import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLinksMenuComponent } from './mobile-links-menu.component';

describe('MobileLinksMenuComponent', () => {
  let component: MobileLinksMenuComponent;
  let fixture: ComponentFixture<MobileLinksMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileLinksMenuComponent]
    });
    fixture = TestBed.createComponent(MobileLinksMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
