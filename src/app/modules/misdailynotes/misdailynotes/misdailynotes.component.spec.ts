import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisdailynotesComponent } from './misdailynotes.component';

describe('MisdailynotesComponent', () => {
  let component: MisdailynotesComponent;
  let fixture: ComponentFixture<MisdailynotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisdailynotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdailynotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
