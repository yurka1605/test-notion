import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform<T>(mapList: Map<string, T> | null): Array<T & {id: string}> {
    if (!mapList) {
      return [];
    }

    const arr = [];

    for (let [id, data] of mapList as Map<string, T>) {
      arr.push({ id, ...data });
    }

    return arr;
  }
}
