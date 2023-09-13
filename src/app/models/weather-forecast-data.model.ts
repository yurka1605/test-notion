export interface HttpWeatherForecastResponse {
    lat: number;
    lon: number;
    name: string;
    timezone: string,
    timezone_offset: number,
}

export interface HttpWeatherForecastDailyResponse extends HttpWeatherForecastResponse {
    [WeatherForecastDataType.Daily]: Array<DailyData>;
}

export interface HttpWeatherForecastHourlyResponse extends HttpWeatherForecastResponse {
    [WeatherForecastDataType.Hourly]: Array<WeatherData>;
}

export interface WeatherData {
    dt: number;
    temp: number;
}

export interface DailyData {
    dt: number;
    temp: {
        morn: number;
        day: number;
        eve: number;
        night: number;
        min: number;
        max: number;
    }
}

export enum WeatherForecastDataType {
    Hourly = 'hourly',
    Daily = 'daily',
}

export interface WeatherForecastData {
    [WeatherForecastDataType.Daily]?:  Map<number, number>;
    [WeatherForecastDataType.Hourly]?: Map<number, number>; 
}