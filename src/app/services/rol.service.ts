import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private API_URL: string = 'http://localhost:3000/roles';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.API_URL);
  }
}
