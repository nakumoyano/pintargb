import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Empleado } from 'src/app/models/empleado';
import { Producto } from 'src/app/models/producto';
import { TipoPago } from 'src/app/models/tipoPago';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css'],
})
export class ListadoVentasComponent implements OnInit {
  @Input() venta: Venta;

  listado: Venta[];

  private subscription = new Subscription();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private ventaServicio: VentaService,
    private tipoPagoService: TipoPagoService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
    // this.actulaizarTodo();
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
          this.ventaServicio.obtenerPorId(id).subscribe({
            next: (respuesta: Venta) => {
              this.venta = respuesta;
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
                      this.ventaServicio.obtener().subscribe({
                        next: (respuesta: Venta[]) => {
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

  actualizarListadoCliente() {
    this.clienteService.obtener().subscribe({
      next: (clients: Cliente[]) => {
        this.ventaServicio.obtener().subscribe({
          next: (respuesta: Venta[]) => {
            for (const venta of respuesta) {
              const clienteIndex = clients.findIndex(
                (x) => x.id === venta.clienteId
              );
              venta.clientes = clients[clienteIndex];
            }
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
  }
}
