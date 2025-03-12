import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDesc',
})
export class CustomDescPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    console.log(value.length)
    if (value.length > 80) return value.slice(0, 66);
    return value;
  }
}
