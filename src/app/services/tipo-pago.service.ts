import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoPago } from '../models/tipoPago';

@Injectable({
  providedIn: 'root',
})
export class TipoPagoService {
  private API_URL: string = 'http://localhost:3000/tipoPago';

  constructor(private http: HttpClient) {}

  obtener(): Observable<TipoPago[]> {
    return this.http.get<TipoPago[]>(this.API_URL);
  }
}
