import { TestBed } from '@angular/core/testing';

import { ReporteProductoService } from './reporte-producto.service';

describe('ReporteProductoService', () => {
  let service: ReporteProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
