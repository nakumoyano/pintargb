import { Cliente } from './cliente';
import { Empleado } from './empleado';
import { Producto } from './producto';
import { TipoPago } from './tipoPago';

export class Venta {
  id: string;
  tipoPago: TipoPago;
  tipoPagoId: string;
  empleados?: Empleado;
  empleadoId: string;
  clientes?: Cliente;
  clienteId: string;
  fecha: Date;
  total: number;
  productos?: Producto;
  productoId: string;
}
