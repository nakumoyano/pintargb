import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteProveedor } from '../models/reporteProveedor';

@Injectable({
  providedIn: 'root',
})
export class ReporteProveedoresService {
  private API_URL: string =
    'http://localhost:3000/proveedor?costoProveedor_gte=3500&costoProveedor_lte=4500&metodoEnvioId=3';

  constructor(private http: HttpClient) {}

  obtener(): Observable<ReporteProveedor[]> {
    return this.http.get<ReporteProveedor[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<ReporteProveedor> {
    return this.http.get<ReporteProveedor>(`${this.API_URL}/${id}`);
  }

  agregar(reporte: ReporteProveedor): Observable<ReporteProveedor> {
    return this.http.post<ReporteProveedor>(this.API_URL, reporte);
  }

  modificar(reporte: ReporteProveedor): Observable<ReporteProveedor> {
    return this.http.put<ReporteProveedor>(
      `${this.API_URL}/${reporte.id}`,
      reporte
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(reporte: ReporteProveedor): Observable<ReporteProveedor> {
    return this.http.put<ReporteProveedor>(this.API_URL, reporte);
  }
}
