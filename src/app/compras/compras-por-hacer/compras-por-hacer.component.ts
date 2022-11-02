import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Estado } from 'src/app/models/estado';
import { OrdenCompra } from 'src/app/models/ordenCompra';
import { Proveedor } from 'src/app/models/proveedores';
import { TipoPago } from 'src/app/models/tipoPago';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstadoService } from 'src/app/services/estado.service';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras-por-hacer',
  templateUrl: './compras-por-hacer.component.html',
  styleUrls: ['./compras-por-hacer.component.css'],
})
export class ComprasPorHacerComponent implements OnInit {
  @Input() compra: OrdenCompra;

  filterpost = '';

  listado: OrdenCompra[];

  private subscription = new Subscription();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private compraServicio: OrdenCompraService,
    private tipoPagoService: TipoPagoService,
    private proveedorService: ProveedorService,
    private estadoService: EstadoService
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
          this.compraServicio.obtenerPorId(id).subscribe({
            next: (respuesta: OrdenCompra) => {
              this.compra = respuesta;
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
                      this.compraServicio.obtener().subscribe({
                        next: (respuesta: OrdenCompra[]) => {
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
}
