import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySchemeMaturityComponent } from './monthly-scheme-maturity.component';

describe('MonthlySchemeMaturityComponent', () => {
  let component: MonthlySchemeMaturityComponent;
  let fixture: ComponentFixture<MonthlySchemeMaturityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySchemeMaturityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySchemeMaturityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
