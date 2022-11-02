import { MetodosEnvios } from './metodoEnvio';

export class ReporteProveedor {
  id: string;
  nombre: string;
  numIdentificaion: number;
  mail: string;
  telefono: number;
  direccion: string;
  metodoEnvio?: MetodosEnvios;
  metodoEnvioId: string;
  costoProveedor: number;
}
