import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'stopwatchPipe' })
export class StopwatchPipe implements PipeTransform {
  transform(seconds: number) {
    let result = '';
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    result += this.getStringFromNumber(hours % 60) + ':';
    result += this.getStringFromNumber(minutes % 60) + ':';
    result += this.getStringFromNumber(seconds % 60);
    return result;
  }

  getDigitsCount(value: number) {
    return value.toString().length;
  }

  getStringFromNumber(count: number) {
    let result = this.getDigitsCount(count) == 2
      ? count.toString() : this.getDigitsCount(count) == 1
        ? '0' + count.toString() : '--';
    return result;
  }
}