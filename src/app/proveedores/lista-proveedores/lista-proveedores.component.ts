import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetodosEnvios } from 'src/app/models/metodoEnvio';
import { Proveedor } from 'src/app/models/proveedores';
import { MetodoEnvioService } from 'src/app/services/metodo-envio.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css'],
})
export class ListaProveedoresComponent implements OnInit {
  @Input() proveedor: Proveedor;

  listado: Proveedor[];

  private subscription = new Subscription();

  constructor(
    private proveedorServicio: ProveedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private metodoEnvioServicio: MetodoEnvioService
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // actualizarListado() {
  //   this.subscription.add(
  //     this.proveedorServicio.obtener().subscribe({
  //       next: (respuesta: Proveedor[]) => {
  //         this.listado = respuesta;
  //       },
  //       error: () => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: 'Error al conectar con la Api!',
  //         });
  //       },
  //     })
  //   );
  // }

  actualizarListado() {
    this.subscription.add(
      this.metodoEnvioServicio.obtener().subscribe({
        next: (metodos: MetodosEnvios[]) => {
          this.proveedorServicio.obtener().subscribe({
            next: (respuesta: Proveedor[]) => {
              for (const proveedor of respuesta) {
                const metodoIndex = metodos.findIndex(
                  (x) => x.id === proveedor.metodoEnvioId
                );
                proveedor.metodoEnvio = metodos[metodoIndex];
              }

              this.listado = respuesta;
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

  actualizarArticulo(id: string) {
    this.router.navigate([]);
  }

  cargarArticulo() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.proveedorServicio.obtenerPorId(id).subscribe({
            next: (respuesta: Proveedor) => {
              this.proveedor = respuesta;
            },
            error: () => {
              alert('error al obtener el proveedor');
            },
          });
        },
      })
    );
  }
}
