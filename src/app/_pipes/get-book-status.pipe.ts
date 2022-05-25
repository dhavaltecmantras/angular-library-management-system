import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getBookStatus',
})
export class GetBookStatusPipe implements PipeTransform {
  transform(status: unknown, ...args: unknown[]): unknown {
    if (status == 1) {
      return 'Issued';
    } else if (status == 2) {
      return 'Penalty Applied';
    } else {
      return 'Received';
    }
  }
}
