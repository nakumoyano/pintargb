import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Empleado } from 'src/app/models/empleado';
import { Producto } from 'src/app/models/producto';
import { ReporteVenta } from 'src/app/models/reporteVenta';
import { TipoPago } from 'src/app/models/tipoPago';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ReporteVentasService } from 'src/app/services/reporte-ventas.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportes-ventas',
  templateUrl: './reportes-ventas.component.html',
  styleUrls: ['./reportes-ventas.component.css'],
})
export class ReportesVentasComponent implements OnInit {
  @Input() reporte: ReporteVenta;

  listado: ReporteVenta[];

  private subscription = new Subscription();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private tipoPagoService: TipoPagoService,
    private productoService: ProductoService,
    private reporteService: ReporteVentasService
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
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
          this.reporteService.obtenerPorId(id).subscribe({
            next: (respuesta: ReporteVenta) => {
              this.reporte = respuesta;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al obtener la venta!',
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
          this.clienteService.obtener().subscribe({
            next: (clients: Cliente[]) => {
              this.tipoPagoService.obtener().subscribe({
                next: (pagos: TipoPago[]) => {
                  this.productoService.obtener().subscribe({
                    next: (products: Producto[]) => {
                      this.reporteService.obtener().subscribe({
                        next: (respuesta: ReporteVenta[]) => {
                          for (const venta of respuesta) {
                            const empleadoIndex = employees.findIndex(
                              (x) => x.id === venta.empleadoId
                            );
                            const clienteIndex = clients.findIndex(
                              (xx) => xx.id === venta.clienteId
                            );
                            const pagoIndex = pagos.findIndex(
                              (xxx) => xxx.id === venta.tipoPagoId
                            );
                            const productoIndex = products.findIndex(
                              (xxxx) => xxxx.id === venta.productoId
                            );
                            venta.empleados = employees[empleadoIndex];
                            venta.clientes = clients[clienteIndex];
                            venta.tipoPago = pagos[pagoIndex];
                            venta.productos = products[productoIndex];
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
}
