import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit, OnDestroy {
  // @Input() cliente: Cliente;
  // @Input() id: string;
  // @Output() onEliminar = new EventEmitter();
  clientes: Cliente[];
  private subscription = new Subscription();

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // eliminar() {
  //   const result: boolean = confirm(
  //     'Esta seguro que desea boorar este cliente?'
  //   );

  //   if (result) {
  //     this.subscription.add(
  //       this.clienteService.eliminar(this.cliente).subscribe({
  //         next: () => {
  //           this.onEliminar.emit();
  //           alert('cliente eliminado con exito');
  //         },
  //         error: () => {
  //           alert('error al borrar este cliente');
  //         },
  //       })
  //     );
  //   }
  // }

  // delete(cliente: Cliente) {
  //   console.log('dasdas');
  //   this.clienteService
  //     .eliminar(cliente.id)
  //     .subscribe((res) =>
  //       this.clienteService
  //         .obtener()
  //         .subscribe((response) => (this.clientes = response))
  //     );
  // }
}
