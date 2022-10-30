import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proveedor } from 'src/app/models/proveedores';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css'],
})
export class NuevoProveedorComponent implements OnInit {
  proveedor: Proveedor = new Proveedor();

  private subscription = new Subscription();

  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  agregar() {
    Swal.fire({ title: 'Proveedor registrado' });

    this.subscription.add(
      this.proveedorService.agregar(this.proveedor).subscribe({
        next: () => {
          this.router.navigate(['nuevo-proveedor']);
          location.reload();
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

  cargar(): void {
    this.activatedRoute.params.subscribe((e) => {
      let id = e['id'];
      if (id) {
        this.proveedorService
          .obtenerPorId(id)
          .subscribe((es) => (this.proveedor = es));
      }
    });
  }

  update() {
    Swal.fire({
      title: '¿Quieres guardar los cambios realizados?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Cambios guardados!', '', 'success');
        this.proveedorService
          .modificar(this.proveedor)
          .subscribe((res) => this.router.navigate(['/listado-proveedores']));
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', '', 'info');
      }
    });
  }
}
