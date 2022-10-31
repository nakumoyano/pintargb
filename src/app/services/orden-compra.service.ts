import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenCompra } from '../models/ordenCompra';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  private API_URL: string = 'http://localhost:3000/ordenesCompra';

  constructor(private http: HttpClient) {}

  obtener(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(`${this.API_URL}/${id}`);
  }

  agregar(compra: OrdenCompra): Observable<OrdenCompra> {
    return this.http.post<OrdenCompra>(this.API_URL, compra);
  }

  modificar(compra: OrdenCompra): Observable<OrdenCompra> {
    return this.http.put<OrdenCompra>(`${this.API_URL}/${compra.id}`, compra);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(compra: OrdenCompra): Observable<OrdenCompra> {
    return this.http.put<OrdenCompra>(this.API_URL, compra);
  }
}
