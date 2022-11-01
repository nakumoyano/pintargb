import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteProducto } from '../models/reporteProducto';

@Injectable({
  providedIn: 'root',
})
export class ReporteProductoService {
  private API_URL: string =
    'http://localhost:3000/producto?stock_gte=1&stock_lte=10';

  constructor(private http: HttpClient) {}

  obtener(): Observable<ReporteProducto[]> {
    return this.http.get<ReporteProducto[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<ReporteProducto> {
    return this.http.get<ReporteProducto>(`${this.API_URL}/${id}`);
  }

  agregar(reporte: ReporteProducto): Observable<ReporteProducto> {
    return this.http.post<ReporteProducto>(this.API_URL, reporte);
  }

  modificar(reporte: ReporteProducto): Observable<ReporteProducto> {
    return this.http.put<ReporteProducto>(
      `${this.API_URL}/${reporte.id}`,
      reporte
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(reporte: ReporteProducto): Observable<ReporteProducto> {
    return this.http.put<ReporteProducto>(this.API_URL, reporte);
  }
}
