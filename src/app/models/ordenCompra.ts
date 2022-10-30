import { Empleado } from './empleado';
import { Proveedor } from './proveedores';

export class OrdenCompra {
  id: string;
  proveedor?: Proveedor;
  proveedorId: string;
  emepleado?: Empleado;
  empleadoId: string;
  tipoPago: string;
  fechaCompra: string;
  total: number;
  estado: string;
}
