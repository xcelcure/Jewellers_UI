import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastMovingProductComponent } from './fast-moving-product.component';

describe('FastMovingProductComponent', () => {
  let component: FastMovingProductComponent;
  let fixture: ComponentFixture<FastMovingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastMovingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastMovingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
