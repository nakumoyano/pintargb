import { Empleado } from './empleado';
import { Estado } from './estado';
import { Proveedor } from './proveedores';
import { TipoPago } from './tipoPago';

export class OrdenCompra {
  id: string;
  proveedor?: Proveedor;
  proveedorId: string;
  empleado?: Empleado;
  empleadoId: string;
  tipoPago?: TipoPago;
  tipoPagoId: string;
  fechaCompra: string;
  total: number;
  estado?: Estado;
  estadoId: string;
}
