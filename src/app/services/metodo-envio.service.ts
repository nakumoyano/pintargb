import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodosEnvios } from '../models/metodoEnvio';

@Injectable({
  providedIn: 'root',
})
export class MetodoEnvioService {
  private API_URL: string = 'http://localhost:3000/metodosEnvios';

  constructor(private http: HttpClient) {}

  obtener(): Observable<MetodosEnvios[]> {
    return this.http.get<MetodosEnvios[]>(this.API_URL);
  }
}
