import { SettingService } from './../services/setting.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataCuacaService } from 'src/app/services/data-cuaca.service';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  isLoading: boolean = true;
  dataSetting = {
    temp: '',
    windSpeed: '',
    time: '',
  };

  public isThirdItem(index: number): boolean {
    return index === 2;
  }

  infoCuacaWilayah: any[] = [];
  lokasiWilayah: any;
  isLargeScreen: boolean = false;
  randomNumberRain: number = 0;
  randomNumberUv: number = 0;
  randomNumberWind: number = 0;

  constructor(
    private dataCuacaService: DataCuacaService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSetting = this.settingService.getSettingStorage();
    this.dataCuacaService
      .getWeatherData()
      .pipe(
        switchMap((data) => {
          return this.dataCuacaService.getLocationFromDevice();
        }),
        switchMap(() => {
          this.dataCuacaService.matchWeatherWithLocation();
          return this.dataCuacaService.getCuacaFromRealLocation();
        })
      )
      .subscribe((data) => {
        this.infoCuacaWilayah = data;
        this.isLoading = false;
      });
    this.dataCuacaService.getLocationFromDevice().subscribe((data) => {
      this.lokasiWilayah = data.address.city;
    });
    this.generateRandomChanceOfRain();
    this.generateRandomUV();
    this.generateRandomWind();

    const storedSettings = this.settingService.getSettingStorage();
    if (storedSettings === undefined) {
      this.settingService.setDefaultSettingStorage();
    }
  }

  onSearchClick() {
    this.router.navigate(['/cities']);
  }

  toggleIsLargeScreen() {
    this.isLargeScreen = !this.isLargeScreen;
  }

  getTanggal(jamLengkap: string): string {
    return this.dataCuacaService.getTanggal(jamLengkap);
  }

  getNamaBulan(angkaBulan: string): string {
    return this.dataCuacaService.getNamaBulan(angkaBulan);
  }

  getBulan(jamLengkap: string): string {
    return this.dataCuacaService.getBulan(jamLengkap);
  }

  getTanggalBulanJam(jamLengkap: string): string {
    return this.dataCuacaService.getTanggalBulanJam(jamLengkap);
  }

  getTodayDate(): string {
    return this.dataCuacaService.getTodayDate();
  }

  getDayLabel(jamLengkap: string): string {
    return this.dataCuacaService.getDayLabel(jamLengkap);
  }

  getImgWeather(kodeCuaca: string) {
    return this.dataCuacaService.getImgWeather(kodeCuaca);
  }

  getConditionWeather(kodeCuaca: string) {
    return this.dataCuacaService.getConditionWeather(kodeCuaca);
  }

  generateRandomWind() {
    return (this.randomNumberWind = Math.floor(Math.random() * 25) + 1);
  }
  generateRandomUV() {
    return (this.randomNumberUv = Math.floor(Math.random() * 5) + 1);
  }
  generateRandomChanceOfRain() {
    return (this.randomNumberRain = Math.floor(Math.random() * 50) + 1);
  }

  getTemperatureUnit(num: number): number {
    return this.settingService.getTemperatureUnit(num);
  }
  geWindSpeedUnit(num: number): number {
    return this.settingService.getWindSpeedUnit(num);
  }
  getJam(jamLengkap: string): string {
    return this.dataCuacaService.getJam(jamLengkap);
  }
  getNumberTimeUnit(num: string): string {
    const jam = this.getJam(num);
    return this.settingService.getNumberTimeUnit(num);
  }
}
