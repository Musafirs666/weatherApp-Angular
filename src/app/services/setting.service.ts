import { Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private dataSettingSubject = new BehaviorSubject<any>(null);

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.initializeDataSetting();
  }

  initializeDataSetting() {
    const storedData = this.storage.get('setting');
    if (storedData) {
      this.dataSettingSubject.next(storedData);
    } else {
      this.setDefaultSettingStorage();
    }
  }

  getDataSettingObservable() {
    return this.dataSettingSubject.asObservable();
  }

  setDefaultSettingStorage() {
    const defaultSetting = {
      temp: 'celcius',
      windSpeed: 'km/h',
      time: 'WIB',
    };
    this.storage.set('setting', defaultSetting);
    this.dataSettingSubject.next(defaultSetting);
  }

  setTemperatureUnit(value: 'celcius' | 'fahrenheit') {
    const currentDataSetting = this.dataSettingSubject.getValue();
    currentDataSetting.temp = value;
    this.storage.set('setting', currentDataSetting);
    this.dataSettingSubject.next(currentDataSetting);
  }

  setWindSpeedUnit(value: 'km/h' | 'm/s' | 'knots') {
    const currentDataSetting = this.dataSettingSubject.getValue();
    currentDataSetting.windSpeed = value;
    this.storage.set('setting', currentDataSetting);
    this.dataSettingSubject.next(currentDataSetting);
  }

  setTimeUnit(value: 'WIB' | 'WIT' | 'WITA') {
    const currentDataSetting = this.dataSettingSubject.getValue();
    currentDataSetting.time = value;
    this.storage.set('setting', currentDataSetting);
    this.dataSettingSubject.next(currentDataSetting);
  }

  getSettingStorage() {
    return this.dataSettingSubject.getValue();
  }

  getTemperatureUnit(number: number): number {
    const currentDataSetting = this.dataSettingSubject.getValue();
    switch (currentDataSetting.temp) {
      case 'fahrenheit':
        return (number * 9) / 5 + 32;
      default:
        return number;
    }
  }

  getWindSpeedUnit(number: number): number {
    const currentDataSetting = this.dataSettingSubject.getValue();
    switch (currentDataSetting.windSpeed) {
      case 'm/s':
        return +(number / 3.6).toFixed(2); // Memastikan memiliki dua digit desimal
      case 'knots':
        return Math.floor(number / 1.852);
      default:
        return number;
    }
  }

  getNumberTimeUnit(number: string): string {
    const currentDataSetting = this.dataSettingSubject.getValue();
    let formattedTime = '';
  
    switch (currentDataSetting.time) {
      case 'WITA':
        formattedTime = this.formatTime(number, 'WITA');
        break;
      case 'WIT':
        formattedTime = this.formatTime(number, 'WIT');
        break;
      default:
        formattedTime = this.formatTime(number, 'WIB');
        break;
    }
  
    return formattedTime;
  }
  
  private formatTime(time: string, timeZone: string): string {
    const parts = time.split(' '); // 00:00 WIB menjadi ["00:00","WIB"] 
    const jam = parts[1].split(':')[0]; //00:00 menjadi ["00","00"]
    let formattedJam = jam.padStart(2, '0');
  
    if (timeZone === 'WITA') {
      const jamWita = parseInt(jam, 10) + 1;
      formattedJam = jamWita.toString().padStart(2, '0');
    } else if (timeZone === 'WIT') {
      const jamWit = parseInt(jam, 10) + 2;
      formattedJam = jamWit.toString().padStart(2, '0');
    }
  
    return formattedJam + ':00 ' + timeZone;
  }
  
}
