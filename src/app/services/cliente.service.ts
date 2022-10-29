import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private API_URL: string =
    'https://635c6a96f0bc26795bfe72b4.mockapi.io/Apiv2/Cliente';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  agregar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API_URL, cliente);
  }

  modificar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API_URL}/${cliente.id}`, cliente);
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
