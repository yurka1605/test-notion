import { Pipe, PipeTransform } from '@angular/core';
import { WeatherForecastData, WeatherForecastDataType } from '../models/weather-forecast-data.model';

@Pipe({
  name: 'rewriteAsObjectByType'
})
export class RewriteAsObjectByTypePipe implements PipeTransform {

  transform(value: Array<WeatherForecastData & {id: string}>, type: WeatherForecastDataType): Array<{[key: string | number]: string | number}> {
    return value.map(el => {
      const objectEl: {[key: string | number]: string | number} = {id: el.id};

      for (let [key, value] of el[type] as Map<number, number>) {
        objectEl[key] = value;
      }

      return objectEl;
    });
  }

}
