import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpCityGeoResponse } from '../models/geo.model';
import { HttpWeatherForecastDailyResponse, HttpWeatherForecastHourlyResponse, HttpWeatherForecastResponse, WeatherForecastDataType } from '../models/weather-forecast-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastApiService {
  apiUrl = 'https://api.openweathermap.org';
  apiKey = '010721642521f31b0fbc8c3831d45951';

  constructor(private http: HttpClient) {}

  getCityCoordinates(cityName: string): Observable<HttpCityGeoResponse> {
    return this.http.get<HttpCityGeoResponse[]>(`${this.apiUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`)
                    .pipe(map(res => res[0] || null));
  }

  getHourlyData(lat: number, lon: number) {
    return this.getData<HttpWeatherForecastHourlyResponse>(lat, lon, WeatherForecastDataType.Daily);
  }

  getDailyData(lat: number, lon: number) {
    return this.getData<HttpWeatherForecastDailyResponse>(lat, lon, WeatherForecastDataType.Hourly);
  }

  private getData<T extends HttpWeatherForecastResponse>(lat: number, lon: number, excludedDataType: WeatherForecastDataType) {
    return this.http.get<T>(`${this.apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,${excludedDataType},alerts&appid=${this.apiKey}`);
  }
}
