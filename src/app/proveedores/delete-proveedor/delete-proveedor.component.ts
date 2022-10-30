import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-proveedor',
  templateUrl: './delete-proveedor.component.html',
  styleUrls: ['./delete-proveedor.component.css'],
})
export class DeleteProveedorComponent implements OnInit {
  @Input() id: string;
  @Output() onEliminar = new EventEmitter();

  private subscription = new Subscription();

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este proveedor?',
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
          'El proveedor fue eliminado con éxito.',
          'success'
        );
        this.subscription.add(
          this.proveedorService.eliminar(this.id).subscribe({
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
