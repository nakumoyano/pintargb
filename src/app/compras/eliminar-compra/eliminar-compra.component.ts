import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdenCompraService } from 'src/app/services/orden-compra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-compra',
  templateUrl: './eliminar-compra.component.html',
  styleUrls: ['./eliminar-compra.component.css'],
})
export class EliminarCompraComponent implements OnInit {
  @Input() id: string;
  @Output() onEliminar = new EventEmitter();

  private subscription = new Subscription();

  constructor(private comprasServicio: OrdenCompraService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este pedido de compra?',
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
          'El pedido de compra fue eliminado con éxito.',
          'success'
        );
        this.subscription.add(
          this.comprasServicio.eliminar(this.id).subscribe({
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
