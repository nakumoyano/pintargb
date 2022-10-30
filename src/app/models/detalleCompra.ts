import { OrdenCompra } from './ordenCompra';
import { Producto } from './producto';

export class DetalleCompra {
  id: string;
  ordenCompra?: OrdenCompra;
  ordenCompraId: string;
  producto?: Producto;
  productoId: string;
  cantidad: number;
  precioCompra: number;
}
