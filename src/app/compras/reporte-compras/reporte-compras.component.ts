import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Estado } from 'src/app/models/estado';
import { Proveedor } from 'src/app/models/proveedores';
import { ReporteCompra } from 'src/app/models/reporteCompra';
import { TipoPago } from 'src/app/models/tipoPago';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ReporteComprasService } from 'src/app/services/reporte-compras.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-compras',
  templateUrl: './reporte-compras.component.html',
  styleUrls: ['./reporte-compras.component.css'],
})
export class ReporteComprasComponent implements OnInit {
  @Input() reporteCompra: ReporteCompra;

  listado: ReporteCompra[];

  datos: ChartData<'pie', number[], string>;
  legends: string[] = ['Compras'];

  private subscription = new Subscription();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reporteServicio: ReporteComprasService,
    private tipoPagoService: TipoPagoService,
    private proveedorService: ProveedorService,
    private estadoService: EstadoService
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
    this.datosReporteGrafico();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarArticulo(id: string) {
    this.router.navigate([]);
  }

  cargarArticulo() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.reporteServicio.obtenerPorId(id).subscribe({
            next: (respuesta: ReporteCompra) => {
              this.reporteCompra = respuesta;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al obtener la compra!',
              });
            },
          });
        },
      })
    );
  }

  actualizarListado() {
    this.subscription.add(
      this.empleadoServicio.obtener().subscribe({
        next: (employees: Empleado[]) => {
          this.estadoService.obtener().subscribe({
            next: (estados: Estado[]) => {
              this.tipoPagoService.obtener().subscribe({
                next: (pagos: TipoPago[]) => {
                  this.proveedorService.obtener().subscribe({
                    next: (proveedores: Proveedor[]) => {
                      this.reporteServicio.obtener().subscribe({
                        next: (respuesta: ReporteCompra[]) => {
                          for (const compra of respuesta) {
                            const empleadoIndex = employees.findIndex(
                              (x) => x.id === compra.empleadoId
                            );
                            const estadoIndex = estados.findIndex(
                              (xx) => xx.id === compra.estadoId
                            );
                            const pagoIndex = pagos.findIndex(
                              (xxx) => xxx.id === compra.tipoPagoId
                            );
                            const proveedorIndex = proveedores.findIndex(
                              (xxxx) => xxxx.id === compra.proveedorId
                            );
                            compra.empleado = employees[empleadoIndex];
                            compra.estado = estados[estadoIndex];
                            compra.tipoPago = pagos[pagoIndex];
                            compra.proveedor = proveedores[proveedorIndex];
                          }
                          console.log(respuesta);
                          this.listado = respuesta;
                        },
                        error: (e) => {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Error al conectar con la Api!',
                          });
                        },
                      });
                    },
                  });
                },
              });
            },
          });
        },
      })
    );
  }

  datosReporteGrafico() {
    this.subscription.add(
      this.reporteServicio.obtener().subscribe({
        next: (respuesta: ReporteCompra[]) => {
          this.datos = {
            labels: this.legends,
            datasets: [
              {
                label: 'Estados de la compra',
                data: [respuesta.filter((x) => x.estadoId).length],
              },
              {
                label: 'Proveedor',
                data: [respuesta.filter((x) => x.proveedorId).length],
              },
            ],
          };
        },
        error: () => alert('api no responde'),
      })
    );
  }
}
