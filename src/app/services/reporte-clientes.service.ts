import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteCliente } from '../models/reporteCliente';

@Injectable({
  providedIn: 'root',
})
export class ReporteClientesService {
  private API_URL: string =
    'http://localhost:3000/cliente?documento_gte=30000000&documento_lte=60000000&nombre=Jose';

  constructor(private http: HttpClient) {}

  obtener(): Observable<ReporteCliente[]> {
    return this.http.get<ReporteCliente[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<ReporteCliente> {
    return this.http.get<ReporteCliente>(`${this.API_URL}/${id}`);
  }

  agregar(reporte: ReporteCliente): Observable<ReporteCliente> {
    return this.http.post<ReporteCliente>(this.API_URL, reporte);
  }

  modificar(reporte: ReporteCliente): Observable<ReporteCliente> {
    return this.http.put<ReporteCliente>(
      `${this.API_URL}/${reporte.id}`,
      reporte
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(reporte: ReporteCliente): Observable<ReporteCliente> {
    return this.http.put<ReporteCliente>(this.API_URL, reporte);
  }
}
