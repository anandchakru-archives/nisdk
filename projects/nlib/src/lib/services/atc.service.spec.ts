import { TestBed } from '@angular/core/testing';

import { AtcService } from './atc.service';

describe('AtcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtcService = TestBed.get(AtcService);
    expect(service).toBeTruthy();
  });
});
