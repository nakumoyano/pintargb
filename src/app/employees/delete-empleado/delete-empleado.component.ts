import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-empleado',
  templateUrl: './delete-empleado.component.html',
  styleUrls: ['./delete-empleado.component.css'],
})
export class DeleteEmpleadoComponent implements OnInit {
  @Input() id: string;
  @Output() onEliminar = new EventEmitter();

  private subscription = new Subscription();

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este empleado?',
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
          'El empleado fue eliminado con éxito.',
          'success'
        );
        this.subscription.add(
          this.empleadoService.eliminar(this.id).subscribe({
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
