import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProductos',
})
export class FiltroProductosPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPosts = [];
    for (const post of value) {
      if (post.nombre.indexOf(arg) > -1) {
        resultPosts.push(post);
      }
    }
    return resultPosts;
  }
}
