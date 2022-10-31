import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Empleado } from 'src/app/models/empleado';
import { TipoPago } from 'src/app/models/tipoPago';
import { Venta } from 'src/app/models/venta';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';
import { VentaService } from 'src/app/services/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.css'],
})
export class NuevaVentaComponent implements OnInit {
  venta: Venta = new Venta();
  tiposPagos: TipoPago[];
  employees: Empleado[];
  clients: Cliente[];

  check = false;
  checkImage = false;
  visible: boolean = false;

  private subscription = new Subscription();

  constructor(
    private ventaServicio: VentaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tipoPagoServicio: TipoPagoService,
    private empleadoServicio: EmpleadoService,
    private clienteServicio: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarTiposPagos();
    this.cargarClientes();
    this.cargarEmpleados();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregar() {
    Swal.fire({ title: 'Venta registrada' });
    this.subscription.add(
      this.ventaServicio.agregar(this.venta).subscribe({
        next: () => {
          this.router.navigate(['nueva-venta']);
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
        this.ventaServicio
          .obtenerPorId(id)
          .subscribe((es) => (this.venta = es));
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
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Cambios guardados!', '', 'success');
        this.ventaServicio
          .modificar(this.venta)
          .subscribe((res) => this.router.navigate(['/listado-ventas']));
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }

  cargarTiposPagos() {
    //tipo de pago
    this.venta = { tipoPago: {} } as Venta;
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
    //empleado
    this.venta = { empleados: {} } as Venta;
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

  cargarClientes() {
    //cliente
    this.venta = { clientes: {} } as Venta;
    this.subscription.add(
      this.clienteServicio.obtener().subscribe({
        next: (respuesta: Cliente[]) => {
          this.clients = respuesta;
        },
        error: () => {
          alert('error al obtener los clientes');
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
}
