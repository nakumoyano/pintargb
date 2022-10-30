import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedores';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private API_URL: string = 'http://localhost:3000/proveedor';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.API_URL}/${id}`);
  }

  agregar(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.API_URL, proveedor);
  }

  modificar(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      `${this.API_URL}/${proveedor.id}`,
      proveedor
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.put<Proveedor>(this.API_URL, proveedor);
  }
}
