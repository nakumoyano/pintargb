import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReporteCliente } from 'src/app/models/reporteCliente';
import { ReporteClientesService } from 'src/app/services/reporte-clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-clientes',
  templateUrl: './reporte-clientes.component.html',
  styleUrls: ['./reporte-clientes.component.css'],
})
export class ReporteClientesComponent implements OnInit {
  @Input() reporte: ReporteCliente;

  listado: ReporteCliente[];

  datos: ChartData<'pie', number[], string>;
  legends: string[] = ['Clientes'];

  private subscription = new Subscription();

  constructor(
    private reporteService: ReporteClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actualizarListado();
    this.datosReporteGrafico();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarListado() {
    this.subscription.add(
      this.reporteService.obtener().subscribe({
        next: (respuesta: ReporteCliente[]) => {
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
            next: (respuesta: ReporteCliente) => {
              this.reporte = respuesta;
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al obtener el producto!',
              });
            },
          });
        },
      })
    );
  }

  datosReporteGrafico() {
    this.subscription.add(
      this.reporteService.obtener().subscribe({
        next: (respuesta: ReporteCliente[]) => {
          this.datos = {
            labels: this.legends,
            datasets: [
              {
                label: 'Clientes',
                data: [respuesta.filter((x) => x.nombre).length],
              },
            ],
          };
        },
        error: () => alert('api no responde'),
      })
    );
  }
}
