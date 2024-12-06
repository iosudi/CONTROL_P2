import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddAddressComponent } from './edit-add-address.component';

describe('EditAddAddressComponent', () => {
  let component: EditAddAddressComponent;
  let fixture: ComponentFixture<EditAddAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddAddressComponent]
    });
    fixture = TestBed.createComponent(EditAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
