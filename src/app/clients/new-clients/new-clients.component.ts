import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-new-clients',
  templateUrl: './new-clients.component.html',
  styleUrls: ['./new-clients.component.css'],
})
export class NewClientsComponent implements OnInit, OnDestroy {
  cliente: Cliente = new Cliente();

  private subscription = new Subscription();

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregar() {
    this.subscription.add(
      this.clienteService.agregar(this.cliente).subscribe({
        next: () => {
          this.router.navigate(['nuevo-cliente']);
        },
        error: () => {
          alert('Error al guardar el articulo');
        },
      })
    );
  }

  // cancelar(){
  //   this.router.na
  // }
}
