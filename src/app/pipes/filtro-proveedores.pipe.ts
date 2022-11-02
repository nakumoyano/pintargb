import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProveedores',
})
export class FiltroProveedoresPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const proveedor of value) {
      if (
        proveedor.numIdentificaion.indexOf(arg) > -1 ||
        proveedor.nombre.indexOf(arg) > -1 ||
        proveedor.metodoEnvio?.tipo.indexOf(arg) > -1
      ) {
        resultPosts.push(proveedor);
      }
    }
    return resultPosts;
  }
}
