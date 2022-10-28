import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  logout() {
    return this.loginService.logout();
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }
}
