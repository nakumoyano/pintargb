import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteProveedor } from 'src/app/models/reporteProveedor';
import { ReporteProveedoresService } from 'src/app/services/reporte-proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-proveedores',
  templateUrl: './reporte-proveedores.component.html',
  styleUrls: ['./reporte-proveedores.component.css'],
})
export class ReporteProveedoresComponent implements OnInit {
  @Input() reporte: ReporteProveedor;

  listado: ReporteProveedor[];

  datos: ChartData<'pie'>;
  legends: string[] = ['Proveedores'];

  private subscription = new Subscription();

  constructor(
    private reporteService: ReporteProveedoresService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
    this.datosReporteGrafico();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarListado() {
    this.subscription.add(
      this.reporteService.obtener().subscribe({
        next: (respuesta: ReporteProveedor[]) => {
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
          this.reporteService.obtenerPorId(id).subscribe({
            next: (respuesta: ReporteProveedor) => {
              this.reporte = respuesta;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al obtener el empleado!',
              });
            },
          });
        },
      })
    );
  }

  datosReporteGrafico() {
    this.subscription.add(
      this.reporteService.obtener().subscribe({
        next: (respuesta: ReporteProveedor[]) => {
          this.datos = {
            labels: this.legends,
            datasets: [
              {
                data: [respuesta.filter((x) => x.metodoEnvioId).length],
                label: 'Modo de envios',
              },
              {
                data: [respuesta.filter((x) => x.nombre).length],
                label: 'Empleados',
              },
              {
                data: [respuesta.filter((x) => x.costoProveedor).length],
                label: 'Costos del proveedor',
              },
            ],
          };
        },
        error: () => alert('api no responde'),
      })
    );
  }
}
