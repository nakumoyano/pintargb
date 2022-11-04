import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProducto',
})
export class FiltroProductosPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const producto of value) {
      if (producto.stock.indexOf(arg) > -1) {
        resultPosts.push(producto);
      }
    }
    return resultPosts;
  }
}
