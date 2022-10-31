import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private API_URL: string = 'http://localhost:3000/producto';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/${id}`);
  }

  agregar(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, producto);
  }

  modificar(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_URL}/${producto.id}`, producto);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.API_URL, producto);
  }
}
