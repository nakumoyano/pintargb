import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarListado() {
    this.subscription.add(
      this.empleadoServicio.obtener().subscribe({
        next: (respuesta: Empleado[]) => {
          this.listado = respuesta;
        },
        error: () => {
          alert('error con api');
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
          this.empleadoServicio.obtenerPorId(id).subscribe({
            next: (respuesta: Empleado) => {
              this.empleado = respuesta;
            },
            error: () => {
              alert('error al obtener el empleado');
            },
          });
        },
      })
    );
  }
}
