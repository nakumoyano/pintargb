import { TestBed } from '@angular/core/testing';

import { ReporteEmpleadosService } from './reporte-empleados.service';

describe('ReporteEmpleadosService', () => {
  let service: ReporteEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
