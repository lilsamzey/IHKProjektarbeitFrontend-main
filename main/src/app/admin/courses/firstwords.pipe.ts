import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstwords'
})
export class FirstwordsPipe implements PipeTransform {

  transform(value: string, limit = 10): string {
    const words = value.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;
  }

}
