import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReporteVentasService } from 'src/app/services/reporte-ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-reporte-venta',
  templateUrl: './eliminar-reporte-venta.component.html',
  styleUrls: ['./eliminar-reporte-venta.component.css'],
})
export class EliminarReporteVentaComponent implements OnInit {
  @Input() id: string;
  @Output() onEliminar = new EventEmitter();

  private subscription = new Subscription();

  constructor(private reporteService: ReporteVentasService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este reporte de venta?',
      text: '¡Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El reporte de venta fue eliminado con éxito.',
          'success'
        );
        this.subscription.add(
          this.reporteService.eliminar(this.id).subscribe({
            next: () => {
              this.onEliminar.emit();
            },
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrio un error!',
                footer: '<a href="">Why do I have this issue?</a>',
              });
            },
          })
        );
      }
    });
  }
}
