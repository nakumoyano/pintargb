import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Injectable()
export class LoginService {
  constructor(private router: Router, private cookies: CookieService) {}

  token: string;

  login(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((token) => {
            this.token = token;
            this.cookies.set('token', this.token);
            Swal.fire({
              title: 'Bienvenido ' + email,
              background: 'white',
              color: 'black',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar',
            });
            this.router.navigate(['/estadisticas']);
          });
      });
  }

  getIdToken() {
    return this.cookies.get('token');
  }

  estaLogueado() {
    return this.cookies.get('token');
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.token = '';
        this.cookies.set('token', this.token);
        location.reload();
        this.router.navigate(['/']);
      });
  }
}
