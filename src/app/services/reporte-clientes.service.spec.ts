import { TestBed } from '@angular/core/testing';

import { ReporteClientesService } from './reporte-clientes.service';

describe('ReporteClientesService', () => {
  let service: ReporteClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
