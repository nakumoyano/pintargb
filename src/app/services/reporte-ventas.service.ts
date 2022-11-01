import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteVenta } from '../models/reporteVenta';

@Injectable({
  providedIn: 'root',
})
export class ReporteVentasService {
  private API_URL: string =
    'http://localhost:3000/venta?total_gte=1000&total_lte=20000';

  constructor(private http: HttpClient) {}

  obtener(): Observable<ReporteVenta[]> {
    return this.http.get<ReporteVenta[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<ReporteVenta> {
    return this.http.get<ReporteVenta>(`${this.API_URL}/${id}`);
  }

  agregar(reporte: ReporteVenta): Observable<ReporteVenta> {
    return this.http.post<ReporteVenta>(this.API_URL, reporte);
  }

  modificar(reporte: ReporteVenta): Observable<ReporteVenta> {
    return this.http.put<ReporteVenta>(
      `${this.API_URL}/${reporte.id}`,
      reporte
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(reporte: ReporteVenta): Observable<ReporteVenta> {
    return this.http.put<ReporteVenta>(this.API_URL, reporte);
  }
}
