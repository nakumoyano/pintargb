import { TestBed } from '@angular/core/testing';

import { MetodoEnvioService } from './metodo-envio.service';

describe('MetodoEnvioService', () => {
  let service: MetodoEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
