import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteProducto } from 'src/app/models/reporteProducto';
import { ReporteProductoService } from 'src/app/services/reporte-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-producto',
  templateUrl: './reporte-producto.component.html',
  styleUrls: ['./reporte-producto.component.css'],
})
export class ReporteProductoComponent implements OnInit {
  @Input() reporte: ReporteProducto;

  listado: ReporteProducto[];

  datos: ChartData<'pie', number[], string>;
  legends: string[] = ['Productos'];

  private subscription = new Subscription();

  constructor(
    private reporteProductoService: ReporteProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.datosReporteGrafico();
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarListado() {
    this.subscription.add(
      this.reporteProductoService.obtener().subscribe({
        next: (respuesta: ReporteProducto[]) => {
          this.listado = respuesta;
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con la Api!',
          });
        },
      })
    );
  }

  actualizarArticulo(id: string) {
    this.router.navigate([]);
  }

  cargarArticulo() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.reporteProductoService.obtenerPorId(id).subscribe({
            next: (respuesta: ReporteProducto) => {
              this.reporte = respuesta;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al obtener el producto!',
              });
            },
          });
        },
      })
    );
  }

  datosReporteGrafico() {
    this.subscription.add(
      this.reporteProductoService.obtener().subscribe({
        next: (respuesta: ReporteProducto[]) => {
          this.datos = {
            labels: this.legends,
            datasets: [
              {
                label: 'Marca',
                data: [respuesta.filter((x) => x.nombre).length],
              },
              {
                label: 'Detalle',
                data: [respuesta.filter((x) => x.detalle).length],
              },
              {
                label: 'Stock',
                data: [respuesta.filter((x) => x.nombre).length],
              },
            ],
          };
        },
        error: () => alert('api no responde'),
      })
    );
  }
}
