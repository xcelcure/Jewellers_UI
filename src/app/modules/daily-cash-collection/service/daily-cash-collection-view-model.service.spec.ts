import { TestBed } from '@angular/core/testing';

import { DailyCashCollectionViewModelService } from './daily-cash-collection-view-model.service';

describe('DailyCashCollectionViewModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyCashCollectionViewModelService = TestBed.get(DailyCashCollectionViewModelService);
    expect(service).toBeTruthy();
  });
});
