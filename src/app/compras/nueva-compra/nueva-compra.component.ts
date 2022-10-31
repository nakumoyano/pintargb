import { Component, OnInit } from '@angular/core';
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
  selector: 'app-nueva-compra',
  templateUrl: './nueva-compra.component.html',
  styleUrls: ['./nueva-compra.component.css'],
})
export class NuevaCompraComponent implements OnInit {
  compra: OrdenCompra = new OrdenCompra();
  employees: Empleado[];
  proveedores: Proveedor[];
  tiposPagos: TipoPago[];
  estados: Estado[];

  check = false;
  checkImage = false;
  visible: boolean = false;

  private subscription = new Subscription();

  constructor(
    private compraServicio: OrdenCompraService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tipoPagoServicio: TipoPagoService,
    private empleadoServicio: EmpleadoService,
    private proveedorServicio: ProveedorService,
    private estadoService: EstadoService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarTiposPagos();
    this.cargarEmpleados();
    this.cargarProveedores();
    this.cargarEstados();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregar() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Venta registrada!',
      showConfirmButton: false,
      timer: 5000,
    });
    this.subscription.add(
      this.compraServicio.agregar(this.compra).subscribe({
        next: () => {
          this.router.navigate(['nueva-compra']);
          location.reload();
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

  cargar(): void {
    this.activatedRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.compraServicio
          .obtenerPorId(id)
          .subscribe((es) => (this.compra = es));
      }
    });
  }

  update() {
    Swal.fire({
      title: '¿Quieres guardar los cambios realizados?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cambios guardados!', '', 'success');
        this.compraServicio
          .modificar(this.compra)
          .subscribe((res) => this.router.navigate(['/compras-por-hacer']));
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }

  cargarTiposPagos() {
    this.compra = { tipoPago: {} } as OrdenCompra;
    this.subscription.add(
      this.tipoPagoServicio.obtener().subscribe({
        next: (respuesta: TipoPago[]) => {
          this.tiposPagos = respuesta;
        },
        error: () => {
          alert('error al obtener los tipo de pago');
        },
      })
    );
  }

  cargarEmpleados() {
    this.compra = { empleado: {} } as OrdenCompra;
    this.subscription.add(
      this.empleadoServicio.obtener().subscribe({
        next: (respuesta: Empleado[]) => {
          this.employees = respuesta;
        },
        error: () => {
          alert('error al obtener los empleados');
        },
      })
    );
  }

  cargarProveedores() {
    this.compra = { proveedor: {} } as OrdenCompra;
    this.subscription.add(
      this.proveedorServicio.obtener().subscribe({
        next: (respuesta: Proveedor[]) => {
          this.proveedores = respuesta;
        },
        error: () => {
          alert('error al obtener los proveedores');
        },
      })
    );
  }

  cargarEstados() {
    this.compra = { estado: {} } as OrdenCompra;
    this.subscription.add(
      this.estadoService.obtener().subscribe({
        next: (respuesta: Estado[]) => {
          this.estados = respuesta;
        },
        error: () => {
          alert('error al obtener los estados');
        },
      })
    );
  }

  checkFunction() {
    this.check = !this.check;
  }
  checkImageFunction() {
    this.checkImage = !this.checkImage;
  }

  recargar() {
    return location.reload();
  }
}
