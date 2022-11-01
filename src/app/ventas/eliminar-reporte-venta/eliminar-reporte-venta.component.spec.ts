import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarReporteVentaComponent } from './eliminar-reporte-venta.component';

describe('EliminarReporteVentaComponent', () => {
  let component: EliminarReporteVentaComponent;
  let fixture: ComponentFixture<EliminarReporteVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarReporteVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarReporteVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
