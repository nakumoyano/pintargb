import { Cliente } from './cliente';
import { Empleado } from './empleado';

export class Venta {
  id: string;
  tipoPago: string;
  empleados?: Empleado;
  empleadoId: string;
  clientes?: Cliente;
  clienteId: string;
  fecha: string;
  total: number;
}
