import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateFee'
})
export class CalculateFeePipe implements PipeTransform {

  transform(value: number): any {
    return Math.floor((value * 100 * 0.029 + 30)/(1-0.029))/100;
  }

}
