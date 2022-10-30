import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private API_URL: string = 'http://localhost:3000/empleado';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.API_URL}/${id}`);
  }

  agregar(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.API_URL, empleado);
  }

  modificar(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.API_URL}/${empleado.id}`, empleado);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(this.API_URL, empleado);
  }
}
