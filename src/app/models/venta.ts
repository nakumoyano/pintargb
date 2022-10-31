import { Cliente } from './cliente';
import { Empleado } from './empleado';
import { TipoPago } from './tipoPago';

export class Venta {
  id: string;
  tipoPago?: TipoPago;
  tipoPagoId: string;
  empleados?: Empleado;
  empleadoId: string;
  clientes?: Cliente;
  clienteId: string;
  fecha: Date;
  total: number;
}
