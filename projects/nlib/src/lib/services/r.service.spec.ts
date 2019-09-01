import { TestBed } from '@angular/core/testing';

import { RService } from './r.service';

describe('RService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RService = TestBed.get(RService);
    expect(service).toBeTruthy();
  });
});
