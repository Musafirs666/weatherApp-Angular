import { Component, OnInit } from '@angular/core';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  isLargeScreen: boolean = false;
  dataSetting = {
    temp: '',
    windSpeed: '',
    time: '',
  };

  constructor(private settingService: SettingService) {}

  ngOnInit(): void {
    this.dataSetting = this.settingService.getSettingStorage();
  }

  setTemperatureUnit(unit: 'celcius' | 'fahrenheit') {
    this.settingService.setTemperatureUnit(unit);
  }

  setWindSpeedUnit(unit: 'km/h' | 'm/s' | 'knots') {
    this.settingService.setWindSpeedUnit(unit);
  }

  setTimeUnit(unit: 'WIB' | 'WIT' | 'WITA') {
    this.settingService.setTimeUnit(unit);
  }

  toggleIsLargeScreen() {
    this.isLargeScreen = !this.isLargeScreen;
  }
}
