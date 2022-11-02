import { TestBed } from '@angular/core/testing';

import { ReporteProveedoresService } from './reporte-proveedores.service';

describe('ReporteProveedoresService', () => {
  let service: ReporteProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
