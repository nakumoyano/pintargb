import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompras',
})
export class FiltroComprasPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const post of value) {
      if (
        post.empleado?.nombre.indexOf(arg) > -1 ||
        post.fechaCompra.indexOf(arg) > -1 ||
        post.estado?.estado.indexOf(arg) > -1
      ) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }
}
