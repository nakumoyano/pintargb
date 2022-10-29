import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    const email = form.value.email;

    const password = form.value.password;

    localStorage.setItem('token', '');
    form.value.email == 'empleado@pintargb.com'
      ? localStorage.setItem('userType', 'employee')
      : localStorage.setItem('userType', 'admin');

    Swal.fire({
      title: 'Bienvenido ' + email,
      background: 'white',
      color: 'black',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    });

    this.loginService.login(email, password);
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }

  getIdToken() {
    return this.loginService.getIdToken();
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
