import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCashCollectionComponent } from './daily-cash-collection.component';

describe('DailyCashCollectionComponent', () => {
  let component: DailyCashCollectionComponent;
  let fixture: ComponentFixture<DailyCashCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyCashCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyCashCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
