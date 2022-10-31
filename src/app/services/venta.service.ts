import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  private API_URL: string = 'http://localhost:3000/venta';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.API_URL}/${id}`);
  }

  agregar(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.API_URL, venta);
  }

  modificar(venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(`${this.API_URL}/${venta.id}`, venta);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(venta: Venta): Observable<Venta> {
    return this.http.put<Venta>(this.API_URL, venta);
  }
}
