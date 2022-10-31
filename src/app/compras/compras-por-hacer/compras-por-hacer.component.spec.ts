import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasPorHacerComponent } from './compras-por-hacer.component';

describe('ComprasPorHacerComponent', () => {
  let component: ComprasPorHacerComponent;
  let fixture: ComponentFixture<ComprasPorHacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasPorHacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasPorHacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
