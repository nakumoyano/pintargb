import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { RolesGuard } from 'src/app/login/roles.guard';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private rolGuard: RolesGuard
  ) {}

  ngOnInit(): void {}

  logout() {
    return this.loginService.logout();
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }

  recargar() {
    location.reload();
  }

  dataUser() {
    return this.loginService.dataUser();
  }
}
