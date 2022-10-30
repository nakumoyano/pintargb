import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Roles } from 'src/app/models/roles';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  @Input() empleado: Empleado;

  listado: Empleado[];

  private subscription = new Subscription();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // actualizarListado() {
  //   this.subscription.add(
  //     this.empleadoServicio.obtener().subscribe({
  //       next: (respuesta: Empleado[]) => {
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

  actualizarArticulo(id: string) {
    this.router.navigate([]);
  }

  cargarArticulo() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.empleadoServicio.obtenerPorId(id).subscribe({
            next: (respuesta: Empleado) => {
              this.empleado = respuesta;
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

  actualizarListado() {
    this.subscription.add(
      this.rolService.obtener().subscribe({
        next: (roles: Roles[]) => {
          this.empleadoServicio.obtener().subscribe({
            next: (respuesta: Empleado[]) => {
              for (const empleado of respuesta) {
                const rolIndex = roles.findIndex(
                  (x) => x.id === empleado.rolId
                );
                empleado.rol = roles[rolIndex];
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
      })
    );
  }
}
