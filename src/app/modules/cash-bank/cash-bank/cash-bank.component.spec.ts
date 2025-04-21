import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBankComponent } from './cash-bank.component';

describe('CashBankComponent', () => {
  let component: CashBankComponent;
  let fixture: ComponentFixture<CashBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
