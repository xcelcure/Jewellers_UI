import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyProductSaleComponent } from './monthly-product-sale.component';

describe('MonthlyProductSaleComponent', () => {
  let component: MonthlyProductSaleComponent;
  let fixture: ComponentFixture<MonthlyProductSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyProductSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
