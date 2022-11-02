import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVentas',
})
export class FiltroVentasPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const ventas of value) {
      if (
        ventas.empleados?.nombre.indexOf(arg) > -1 ||
        ventas.fecha.indexOf(arg) > -1 ||
        ventas.clientes?.nombre.indexOf(arg) > -1 ||
        ventas.productos?.nombre.indexOf(arg) > -1
      ) {
        resultPosts.push(ventas);
      }
    }
    return resultPosts;
  }
}
