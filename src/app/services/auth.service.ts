import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  IsLOggedIn() {
    return !!localStorage.getItem('token');
  }
}
