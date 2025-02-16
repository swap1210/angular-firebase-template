import { TestBed } from '@angular/core/testing';

import { SecureLandingService } from './secure-landing.service';

describe('SecureLandingService', () => {
  let service: SecureLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
