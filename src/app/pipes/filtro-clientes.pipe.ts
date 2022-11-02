import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroClientes',
})
export class FiltroClientesPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const empleado of value) {
      if (
        empleado.nombre.indexOf(arg) > -1 ||
        empleado.apellido.indexOf(arg) > -1
      ) {
        resultPosts.push(empleado);
      }
    }
    return resultPosts;
  }
}
