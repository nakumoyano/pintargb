import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root',
})
export class EstadoService {
  private API_URL: string = 'http://localhost:3000/estados';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.API_URL);
  }
}
