import { TestBed } from '@angular/core/testing';

import { ServicesGlobalService } from './services-global.service';

describe('ServicesGlobalService', () => {
  let service: ServicesGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
