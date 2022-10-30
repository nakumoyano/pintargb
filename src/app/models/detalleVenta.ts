import { Producto } from './producto';
import { Venta } from './venta';

export class DetalleVenta {
  id: string;
  venta?: Venta;
  ventaId: string;
  producto?: Producto;
  productoId: string;
  cantidad: number;
  precio: number;
}
