import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { APP_NAME } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  APP_NAME = APP_NAME;
}
