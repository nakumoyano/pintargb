import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  @Input() cliente: Cliente;

  listado: Cliente[];

  private subscription = new Subscription();

  constructor(
    private clienteService: ClienteService,
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
      this.clienteService.obtener().subscribe({
        next: (respuesta: Cliente[]) => {
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
          this.clienteService.obtenerPorId(id).subscribe({
            next: (respuesta: Cliente) => {
              this.cliente = respuesta;
            },
            error: () => {
              alert('error al obtener el cliente');
            },
          });
        },
      })
    );
  }
}
