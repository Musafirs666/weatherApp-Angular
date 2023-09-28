import { Component } from '@angular/core';
import { DataCuacaService } from '../services/data-cuaca.service';
import { switchMap, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  isLoading: boolean = true;
  dataSetting = {
    temp: '',
    windSpeed: '',
    time: '',
  };
  // searchList = [1,2,3]
  searchCityValue:string =''
  allDataWilayah : any[]=[]
  foundItem: any[] =[]
  randomNumberRain: number = 0
  randomNumberUv: number = 0
  randomNumberWind: number = 0
  public isThirdItem(index: number): boolean {
    return index === 2;
  }

  infoCuacaWilayah: any[] = [];
  lokasiWilayah: any;
  isLargeScreen: boolean = false
  baseUrlLocation: string ='';

  constructor(private dataCuacaService: DataCuacaService, private http: HttpClient, private settingService:SettingService) {
  }

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
    this.dataCuacaService.getLocationFromDevice().subscribe((data)=>{
      this.lokasiWilayah = data.address.city
    })
    this.dataCuacaService.getWeatherData().subscribe((data)=>{
      this.allDataWilayah = data
      
    })
    
    this.generateRandomChanceOfRain()
    this.generateRandomUV()
    this.generateRandomWind()
  }

  handleSearch() {
    this.foundItem = this.allDataWilayah.filter(
      (allWilayah) => allWilayah.kecamatan.toLowerCase() === this.searchCityValue.toLowerCase()
    );

    if (this.foundItem.length > 0) {
      this.baseUrlLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${this.foundItem[0]?.id}.json`;
      this.lokasiWilayah = this.foundItem[0].kecamatan;
      // Panggil getCuacaFromRealLocation dan subscribe ke hasilnya
      this.getCuacaFromRealLocation().subscribe((data) => {
        this.infoCuacaWilayah = data;
      });
    } else {
      alert('Not Found');
    }
}

getCuacaFromRealLocation(): Observable<any[]> {
    // Kembalikan hasil dari http.get sebagai Observable
    return this.http.get<any[]>(this.baseUrlLocation);
}

  toggleIsLargeScreen(){
    this.isLargeScreen = !this.isLargeScreen;
}

  getTanggal(jamLengkap: string): string {
    return this.dataCuacaService.getTanggal(jamLengkap)
  }  

  getNamaBulan(angkaBulan: string): string {
    return this.dataCuacaService.getNamaBulan(angkaBulan)
  }
  
  getBulan(jamLengkap: string): string {
    return this.dataCuacaService.getBulan(jamLengkap)
  }

  getTanggalBulanJam(jamLengkap: string): string {
    return this.dataCuacaService.getTanggalBulanJam(jamLengkap)
  }

  getTodayDate(): string {
    return this.dataCuacaService.getTodayDate()
  }
  
  getDayLabel(jamLengkap: string): string {
    return this.dataCuacaService.getDayLabel(jamLengkap)
  }

  getImgWeather(kodeCuaca:string){
    return this.dataCuacaService.getImgWeather(kodeCuaca)
  }

  getConditionWeather(kodeCuaca:string){
    return this.dataCuacaService.getConditionWeather(kodeCuaca)
  }

  generateRandomWind() {
    return this.randomNumberWind = Math.floor(Math.random() * 25) + 1;
  }
  generateRandomUV() {
    return this.randomNumberUv= Math.floor(Math.random() * 5) + 1;
  }
  generateRandomChanceOfRain() {
    return this.randomNumberRain = Math.floor(Math.random() * 50) + 1;
  }

  getTemperatureUnit(num:number):number{
    return this.settingService.getTemperatureUnit(num)
  }
  getJam(jamLengkap: string): string {
    return this.dataCuacaService.getJam(jamLengkap)
  }
  getNumberTimeUnit(num:string):string{
    const jam = this.getJam(num)
    return this.settingService.getNumberTimeUnit(num)
  }
}
