import { Roles } from './roles';

export class ReporteEmpleado {
  id: string;
  nombre: string;
  mail: string;
  telefono: string;
  direccion: string;
  apellido: string;
  documento: string;
  rol?: Roles;
  rolId: string;
}
