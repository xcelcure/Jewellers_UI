import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmithPositionComponent } from './smith-position.component';

describe('SmithPositionComponent', () => {
  let component: SmithPositionComponent;
  let fixture: ComponentFixture<SmithPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmithPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmithPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
