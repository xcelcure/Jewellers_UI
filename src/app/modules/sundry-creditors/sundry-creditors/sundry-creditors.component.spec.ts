import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SundryCreditorsComponent } from './sundry-creditors.component';

describe('SundryCreditorsComponent', () => {
  let component: SundryCreditorsComponent;
  let fixture: ComponentFixture<SundryCreditorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SundryCreditorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SundryCreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
