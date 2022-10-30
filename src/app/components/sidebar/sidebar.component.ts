import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { RolesGuard } from 'src/app/login/roles.guard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  visibleEmpleado: boolean = false;
  visibleECompras: boolean = false;
  visibleEDeposito: boolean = false;

  constructor(
    private loginService: LoginService,
    private rolGuard: RolesGuard
  ) {}

  ngOnInit(): void {
    this.controlarUsuarioEmpleado();
    this.controlarUsuarioEncargadoCompras();
    this.controladorUsuarioEncargadoDeposito();
  }

  logout() {
    this.loginService.logout();
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }

  recargar() {
    location.reload();
  }

  controlarUsuarioEmpleado() {
    let RolEmpleado = localStorage.getItem('userType');
    if (RolEmpleado === 'employee') {
      return (this.visibleEmpleado = !this.visibleEmpleado);
    }
    return false;
  }

  controlarUsuarioEncargadoCompras() {
    let RolEncargadoCompras = localStorage.getItem('userType');
    if (RolEncargadoCompras === 'encargadocompras') {
      return (this.visibleECompras = !this.visibleECompras);
    }
    return false;
  }

  controladorUsuarioEncargadoDeposito() {
    let RolEncargadoDeposito = localStorage.getItem('userType');
    if (RolEncargadoDeposito === 'encargadodeposito') {
      return (this.visibleEDeposito = !this.visibleEDeposito);
    }
    return false;
  }
}
