import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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

    if (form.value.email == 'empleado@pintargb.com') {
      localStorage.setItem('userType', 'employee');
    } else if (form.value.email == 'encargadocompras@gmail.com') {
      localStorage.setItem('userType', 'encargadocompras');
    } else if (form.value.email == 'encargadodeposito@pintargb.com') {
      localStorage.setItem('userType', 'encargadodeposito');
    } else {
      localStorage.setItem('userType', 'admin');
    }

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
