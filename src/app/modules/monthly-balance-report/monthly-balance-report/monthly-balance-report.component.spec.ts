import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBalanceReportComponent } from './monthly-balance-report.component';

describe('MonthlyBalanceReportComponent', () => {
  let component: MonthlyBalanceReportComponent;
  let fixture: ComponentFixture<MonthlyBalanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyBalanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyBalanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
