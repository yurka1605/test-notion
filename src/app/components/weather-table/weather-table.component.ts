import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DAILY_COLUMNS, HOURLY_COLUMNS } from 'src/app/app.constants';
import { Column } from 'src/app/models/table.model';
import { WeatherForecastData, WeatherForecastDataType } from 'src/app/models/weather-forecast-data.model';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTableComponent {
  @Input() values!: Map<string, WeatherForecastData>;

  readonly WeatherForecastDataType = WeatherForecastDataType;
  dataType: WeatherForecastDataType = WeatherForecastDataType.Daily;
  dataTypes: WeatherForecastDataType[] = [
    WeatherForecastDataType.Daily,
    WeatherForecastDataType.Hourly,
  ];

  private _cityColumn = new Column('id', 'City name');
  private _columnsMap = {
    [WeatherForecastDataType.Daily]: DAILY_COLUMNS,
    [WeatherForecastDataType.Hourly]: HOURLY_COLUMNS,
  };

  get columns() {
    return [this._cityColumn, ...this._columnsMap[this.dataType]];
  }

  changeDataType(type: WeatherForecastDataType) {
    this.dataType = type;
  }
}
