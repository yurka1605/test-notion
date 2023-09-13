import { Injectable } from '@angular/core';
import { DailyData, HttpWeatherForecastDailyResponse, HttpWeatherForecastHourlyResponse, WeatherData, WeatherForecastData, WeatherForecastDataType } from '../models/weather-forecast-data.model';
import { BehaviorSubject, Observable, combineLatest, first, map, of, switchMap } from 'rxjs';
import { WeatherForecastApiService } from './weather-forecast-api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  private dataSubject$: BehaviorSubject<Map<string, WeatherForecastData>> = new BehaviorSubject<Map<string, WeatherForecastData>>(new Map());
  data$ = this.dataSubject$.asObservable();

  constructor(private weatherForecastApi: WeatherForecastApiService) {}

  search(temp: string): Observable<WeatherForecastData | null> {
    return this.weatherForecastApi.getCityCoordinates(temp)
            .pipe(
              switchMap(geo => {
                if (!geo) {
                  return of(null);
                }

                return combineLatest([
                    this.data$.pipe(first()),
                    this.weatherForecastApi.getHourlyData(geo.lat, geo.lon),
                    this.weatherForecastApi.getDailyData(geo.lat, geo.lon),
                ])
                  .pipe(
                    map(([data, hourlyData, dailyData]) => {
                      const weatherForecastCityData = this.getWeatherForecastCityData(hourlyData, dailyData);
                      data.set(geo.name.toLowerCase(), weatherForecastCityData);
                      this.dataSubject$.next(new Map(data));

                      return weatherForecastCityData;
                    }),
                  )
              }),
            );
  }

  private getWeatherForecastCityData(
    hourlyData: HttpWeatherForecastHourlyResponse,
    dailyData: HttpWeatherForecastDailyResponse
  ): WeatherForecastData {
    return {
      [WeatherForecastDataType.Daily]:
        this.convertDataToMap<DailyData>(
          dailyData.daily,
          dailyData.timezone_offset,
          (v, tz) => [
            this.convertToDate(v.dt, tz).getDay(),
            +this.convertKelvinToCelsius(v.temp.day).toFixed()
          ]
        ),
      [WeatherForecastDataType.Hourly]:
        this.convertDataToMap<WeatherData>(
          hourlyData.hourly,
          hourlyData.timezone_offset,
          (v, tz) => [
            this.convertToDate(v.dt, tz).getHours() || 24,
            +this.convertKelvinToCelsius(v.temp).toFixed()
          ]
        ),
    }
  }

  private convertDataToMap<T>(
    values: T[],
    timezoneOffset: number,
    convertCallback: (v: T, tz: number) => [number, number]
  ): Map<number, number> {
    return new Map(values.map(value => convertCallback(value, timezoneOffset)));
  }

  private convertToDate(value: number, timezoneOffset: number): Date {
    return new Date(value*1000 - (timezoneOffset*1000));
  }

  private convertKelvinToCelsius(val: number): number {
    return val - 273;
  }
}
