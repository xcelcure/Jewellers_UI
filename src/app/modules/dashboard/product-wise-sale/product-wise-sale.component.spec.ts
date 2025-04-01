import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWiseSaleComponent } from './product-wise-sale.component';

describe('ProductWiseSaleComponent', () => {
  let component: ProductWiseSaleComponent;
  let fixture: ComponentFixture<ProductWiseSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWiseSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWiseSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
