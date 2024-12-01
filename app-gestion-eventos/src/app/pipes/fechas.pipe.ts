import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechas',
  standalone: true
})
export class FechasPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'dd/MM/yyyy'): string | null {
    if (!value) return null;

    return this.datePipe.transform(value, format);
  }

}
