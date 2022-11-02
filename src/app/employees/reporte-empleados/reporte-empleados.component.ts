import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReporteEmpleado } from 'src/app/models/reporteEmpleado';
import { ReporteEmpleadosService } from 'src/app/services/reporte-empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-empleados',
  templateUrl: './reporte-empleados.component.html',
  styleUrls: ['./reporte-empleados.component.css'],
})
export class ReporteEmpleadosComponent implements OnInit {
  @Input() reporte: ReporteEmpleado;

  listado: ReporteEmpleado[];

  private subscription = new Subscription();

  constructor(
    private reporteService: ReporteEmpleadosService,
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
      this.reporteService.obtener().subscribe({
        next: (respuesta: ReporteEmpleado[]) => {
          this.listado = respuesta;
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

  actualizarArticulo(id: string) {
    this.router.navigate([]);
  }

  cargarArticulo() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.reporteService.obtenerPorId(id).subscribe({
            next: (respuesta: ReporteEmpleado) => {
              this.reporte = respuesta;
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
}
