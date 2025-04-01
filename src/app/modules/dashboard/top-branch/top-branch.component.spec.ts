import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBranchComponent } from './top-branch.component';

describe('TopBranchComponent', () => {
  let component: TopBranchComponent;
  let fixture: ComponentFixture<TopBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
