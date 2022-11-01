import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteCompra } from '../models/reporteCompra';

@Injectable({
  providedIn: 'root',
})
export class ReporteComprasService {
  private API_URL: string =
    'http://localhost:3000/ordenesCompra?fechaCompra_gte=2022-10-30&fechaCompra_lte=2022-11-24&proveedorId=3';

  constructor(private http: HttpClient) {}

  obtener(): Observable<ReporteCompra[]> {
    return this.http.get<ReporteCompra[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<ReporteCompra> {
    return this.http.get<ReporteCompra>(`${this.API_URL}/${id}`);
  }

  agregar(reporte: ReporteCompra): Observable<ReporteCompra> {
    return this.http.post<ReporteCompra>(this.API_URL, reporte);
  }

  modificar(reporte: ReporteCompra): Observable<ReporteCompra> {
    return this.http.put<ReporteCompra>(
      `${this.API_URL}/${reporte.id}`,
      reporte
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(reporte: ReporteCompra): Observable<ReporteCompra> {
    return this.http.put<ReporteCompra>(this.API_URL, reporte);
  }
}
