import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelesRationCaratComponent } from './seles-ration-carat.component';

describe('SelesRationCaratComponent', () => {
  let component: SelesRationCaratComponent;
  let fixture: ComponentFixture<SelesRationCaratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelesRationCaratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelesRationCaratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
