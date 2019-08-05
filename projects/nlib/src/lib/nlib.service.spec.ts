import { TestBed } from '@angular/core/testing';

import { NlibService } from './nlib.service';

describe('NlibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NlibService = TestBed.get(NlibService);
    expect(service).toBeTruthy();
  });
});
