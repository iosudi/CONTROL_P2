import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMiniShopComponent } from './home-mini-shop.component';

describe('HomeMiniShopComponent', () => {
  let component: HomeMiniShopComponent;
  let fixture: ComponentFixture<HomeMiniShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMiniShopComponent]
    });
    fixture = TestBed.createComponent(HomeMiniShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
