import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css'],
})
export class ClientsListComponent implements OnInit {
  listado: Cliente[];

  private subscription = new Subscription();

  constructor(private clienteService: ClienteService, private router: Router) {}

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

  // actualizarArticulo(id:string){
  //   this.router.navigate([])
  // }
}
