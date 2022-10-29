import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private API_URL: string = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${id}`);
  }

  agregar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API_URL, cliente);
  }

  modificar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API_URL}/${cliente.id}`, cliente);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.API_URL, cliente);
  }

  // editar(cliente:Cliente):Observable<Cliente> {
  //   return this.http.put<Cliente>(this.API_URL, cliente)
  // }
}
