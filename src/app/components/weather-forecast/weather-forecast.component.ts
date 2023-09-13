import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { WeatherForecastDataType } from 'src/app/models/weather-forecast-data.model';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecastComponent {
  readonly WeatherForecastDataType = WeatherForecastDataType;
  search: FormControl<string | null> = new FormControl<string>('');
  isNotFound$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public weatherForecastService: WeatherForecastService) {
    this.search.valueChanges.pipe(
      takeUntilDestroyed(),
      tap(() => this.isNotFound$.next(false)),
      distinctUntilChanged(),
      filter(v => !!v),
      debounceTime(1000),
      switchMap(temp => this.weatherForecastService.search(<string>temp?.toLowerCase()))
    ).subscribe(data => this.isNotFound$.next(!data));
  }
}
