import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { LoginService } from './login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pintargb-3er-entrega';

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAnecZn0I6LTkdz9iiJhRR18-3rMYc6U_g',
      authDomain: 'pintargb-c2191.firebaseapp.com',
    });
  }

  estaLogueado() {
    return this.loginService.estaLogueado();
  }
}
