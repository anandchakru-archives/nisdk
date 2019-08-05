import { TestBed } from '@angular/core/testing';

import { ClogService } from './clog.service';

describe('ClogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClogService = TestBed.get(ClogService);
    expect(service).toBeTruthy();
  });
});
