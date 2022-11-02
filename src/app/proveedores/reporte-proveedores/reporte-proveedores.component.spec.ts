import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteProveedoresComponent } from './reporte-proveedores.component';

describe('ReporteProveedoresComponent', () => {
  let component: ReporteProveedoresComponent;
  let fixture: ComponentFixture<ReporteProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteProveedoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
