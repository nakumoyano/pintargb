import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReporteEmpleado } from '../models/reporteEmpleado';

@Injectable({
  providedIn: 'root',
})
export class ReporteEmpleadosService {
  private API_URL: string = 'http://localhost:3000/empleado?rolId=2';

  constructor(private http: HttpClient) {}

  obtener(): Observable<ReporteEmpleado[]> {
    return this.http.get<ReporteEmpleado[]>(this.API_URL);
  }

  obtenerPorId(id: string): Observable<ReporteEmpleado> {
    return this.http.get<ReporteEmpleado>(`${this.API_URL}/${id}`);
  }

  agregar(reporte: ReporteEmpleado): Observable<ReporteEmpleado> {
    return this.http.post<ReporteEmpleado>(this.API_URL, reporte);
  }

  modificar(reporte: ReporteEmpleado): Observable<ReporteEmpleado> {
    return this.http.put<ReporteEmpleado>(
      `${this.API_URL}/${reporte.id}`,
      reporte
    );
  }

  eliminar(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  update(reporte: ReporteEmpleado): Observable<ReporteEmpleado> {
    return this.http.put<ReporteEmpleado>(this.API_URL, reporte);
  }
}
