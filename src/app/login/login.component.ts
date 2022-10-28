import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    const email = form.value.email;

    const password = form.value.password;

    localStorage.setItem('token', '');
    form.value.email == 'empleado@pintargb.com'
      ? localStorage.setItem('userType', 'employee')
      : localStorage.setItem('userType', 'admin');

    this.loginService.login(email, password);
    // this.loginService.login(email, password);
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }

  getIdToken() {
    return this.loginService.getIdToken();
  }
}
