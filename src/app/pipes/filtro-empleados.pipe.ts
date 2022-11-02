import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEmpleados',
})
export class FiltroEmpleadosPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const empleado of value) {
      if (
        empleado.documento.indexOf(arg) > -1 ||
        empleado.nombre.indexOf(arg) > -1 ||
        empleado.rol?.nombre.indexOf(arg) > -1
      ) {
        resultPosts.push(empleado);
      }
    }
    return resultPosts;
  }
}
