import { TestBed } from '@angular/core/testing';

import { DataCuacaService } from './data-cuaca.service';

describe('DataCuacaService', () => {
  let service: DataCuacaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCuacaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
