import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { Roles } from 'src/app/models/roles';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
})
export class NewEmployeeComponent implements OnInit {
  empleado: Empleado = new Empleado();
  roles: Roles[];

  private subscription = new Subscription();

  constructor(
    private empleadoServicio: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rolServicio: RolService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.empleado = { rol: {} } as Empleado;
    this.subscription.add(
      this.rolServicio.obtener().subscribe({
        next: (respuesta: Roles[]) => {
          this.roles = respuesta;
        },
        error: () => {
          alert('error al obtener los roles');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregar() {
    Swal.fire({ title: 'Empleado registrado' });

    this.subscription.add(
      this.empleadoServicio.agregar(this.empleado).subscribe({
        next: () => {
          this.router.navigate(['nuevo-empleado']);
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
        this.empleadoServicio
          .obtenerPorId(id)
          .subscribe((es) => (this.empleado = es));
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
        this.empleadoServicio
          .modificar(this.empleado)
          .subscribe((res) => this.router.navigate(['/listado-empleados']));
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }
}
