import { TestBed } from '@angular/core/testing';

import { ChamadosApiService } from './chamados-api.service';

describe('ChamadosApiService', () => {
  let service: ChamadosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamadosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
