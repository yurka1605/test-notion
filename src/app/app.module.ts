import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules/shared/shared.module';
import { MapToArrayPipe } from './pipes/map-to-array.pipe';
import { WeatherTableComponent } from './components/weather-table/weather-table.component';
import { RewriteAsObjectByTypePipe } from './pipes/rewrite-as-object-by-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent,
    MapToArrayPipe,
    WeatherTableComponent,
    RewriteAsObjectByTypePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
