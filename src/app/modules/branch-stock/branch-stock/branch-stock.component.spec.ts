import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchStockComponent } from './branch-stock.component';

describe('BranchStockComponent', () => {
  let component: BranchStockComponent;
  let fixture: ComponentFixture<BranchStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
