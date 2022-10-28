import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  canActivate() {
    let Role = localStorage.getItem('userType');
    if (Role === 'admin') {
      return true;
    }
    // alert('No tienes el rol de admin!');
    Swal.fire({
      title: 'No tienes el rol de administrador!',
      background: 'white',
      color: 'black',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    });
    return false;
  }
}
