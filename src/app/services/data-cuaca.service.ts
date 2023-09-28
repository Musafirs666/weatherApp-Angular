import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataCuacaService {
  private baseUrl = 'https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json';
  private weatherData: any[] = []; // Variabel untuk menyimpan data cuaca
  private osmApiUrl = 'https://nominatim.openstreetmap.org/reverse?format=json';

  locationData: any;
  currentWilayah = '';
  infoCuacaWilayah: any;
  baseUrlCuacaLocation = '';
  dataCuacaFromRealLocation: any[] = [];

  constructor(private http: HttpClient) { }

  // Fungsi untuk mengambil data cuaca
  getWeatherData(): Observable<any[]> {
    if (this.weatherData.length === 0) {
      return this.http.get<any[]>(this.baseUrl).pipe(
        // Simpan data cuaca dalam variabel weatherData
        tap(data => this.weatherData = data)
      );
    } else {
      // Jika data cuaca sudah ada dalam variabel, gunakan yang ada
      return of(this.weatherData);
    }
  }

  getLocation(lat: number, lon: number): Observable<any> {
    const url = `${this.osmApiUrl}&lat=${lat}&lon=${lon}`;
    return this.http.get(url);
  }

  getLocationFromDevice(): Observable<any> {
    return new Observable((observer) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          this.getLocation(latitude, longitude).subscribe(
            (data) => {
              this.locationData = data;
              this.currentWilayah = data.address.city;
              observer.next(data);
              observer.complete();
            },
            (error) => {
              console.error('Error:', error);
              observer.error(error);
            }
          );
        });
      } else {
        console.error('Geolocation is not available in this browser.');
        observer.error('Geolocation is not available.');
      }
    });
  }
  matchWeatherWithLocation(): void {
    this.infoCuacaWilayah = this.weatherData.filter(
      (weather) => weather.kecamatan === this.currentWilayah
    );
    this.baseUrlCuacaLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${this.infoCuacaWilayah[0]?.id}.json`;
  }
  getCuacaFromRealLocation(): Observable<any[]> {
    if (this.infoCuacaWilayah && this.infoCuacaWilayah.length > 0) {
      return this.http.get<any[]>(this.baseUrlCuacaLocation);
    } else {
      return of([]);
    }
  }

  // markerCuaca:any[]=[]
  getMarkerCuacaPopUp(urlID:number): Observable<any[]>{
      return this.http.get<any[]>(this.baseUrlCuacaLocation = `https://ibnux.github.io/BMKG-importer/cuaca/${urlID}.json`);
  }

  getTanggal(jamLengkap: string): string {
    const parts = jamLengkap.split(' ');
    const tanggal = parts[0].split('-')[2]; // Mengambil bagian tanggal (24)
    return tanggal.padStart(2, '0'); // Tambahkan leading zero jika perlu
  }
  
  getJam(jamLengkap: string): string {
    const parts = jamLengkap.split(' ');
    const jam = parts[1].split(':')[0]; // Mengambil bagian jam (00)
    return jam.padStart(2, '0') + ":00 WIB"; // Tambahkan leading zero jika perlu
  }
  

  getNamaBulan(angkaBulan: string): string {
    switch (angkaBulan) {
      case '01':
        return 'Januari';
      case '02':
        return 'Februari';
      case '03':
        return 'Maret';
      case '04':
        return 'April';
      case '05':
        return 'Mei';
      case '06':
        return 'Juni';
      case '07':
        return 'Juli';
      case '08':
        return 'Agustus';
      case '09':
        return 'September';
      case '10':
        return 'Oktober';
      case '11':
        return 'November';
      case '12':
        return 'Desember';
      default:
        return 'Bulan Tidak Valid';
    }
  }
  
  getBulan(jamLengkap: string): string {
    const parts = jamLengkap.split(' ');
    const angkaBulan = parts[0].split('-')[1]; // Mengambil angka bulan (09)
    const namaBulan = this.getNamaBulan(angkaBulan);
  
    // Mengonversi huruf pertama menjadi huruf kapital
    return namaBulan.charAt(0).toUpperCase() + namaBulan.slice(1);
  }

  getTanggalBulanJam(jamLengkap: string): string {
    const tanggal = this.getTanggal(jamLengkap);
    const bulan = this.getBulan(jamLengkap);
    const jam = this.getJam(jamLengkap);
    
    return `${tanggal} ${bulan} ${jam}`;
  }
  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Fungsi untuk mengubah tanggal menjadi "today" atau "tomorrow" jika sesuai dengan kriteria
  getDayLabel(jamLengkap: string): string {
    const todayDate = this.getTodayDate();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowDateString = tomorrowDate.toISOString().split('T')[0];
  
    if (jamLengkap.split(' ')[0] === todayDate) {
      return 'today';
    } else if (jamLengkap.split(' ')[0] === tomorrowDateString) {
      return 'tomorrow';
    } else {
      // Jika bukan "today" atau "tomorrow", return tanggal dalam format yang diinginkan
      return 'the day after tomorrow';
    }
  }

  getImgWeather(kodeCuaca:string){
    switch (kodeCuaca) {
      case "0":
        return '../../assets/img/sunny.png';
      case "1":
        return '../../assets/img/cloudly.png';
      case "2":
        return '../../assets/img/rainy.png';
      case "3":
        return '../../assets/img/storm.png';
      default:
        return
    }
  }

  getConditionWeather(kodeCuaca:string){
    switch (kodeCuaca) {
      case "0":
        return 'Sunny';
      case "1":
        return 'Cloudy';
      case "2":
        return 'Rainy';
      case "3":
        return 'Storm';
      default:
        return
    }
  }

  generateRandomWind() {
    return Math.floor(Math.random() * 25) + 1;
  }
  generateRandomUV() {
    return Math.floor(Math.random() * 5) + 1;
  }
  generateRandomChanceOfRain() {
    return Math.floor(Math.random() * 70) + 1;
  }
}
