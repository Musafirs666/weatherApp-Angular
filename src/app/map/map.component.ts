import { DataCuacaService } from 'src/app/services/data-cuaca.service';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  isLoading: boolean = true;
  latitute: number = -7.005172738792181;
  longitude: number = 110.43823874938751;

  map: any = L.map;
  centroid: L.LatLngExpression = [-7.005172738792181, 110.43823874938751];

  constructor(private dataCuacaService: DataCuacaService, private router:Router) {}
  forecast = [1, 2, 3];
  sevenDay = [1, 2, 3];
  searchList = [1, 2, 3];

  public isThirdItem(index: number): boolean {
    return index === 2;
  }
  ngOnInit(): void {
    this.initMap();
    this.isLoading = false;
  }

  initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 6,
    });

    const dataPopUp = {
      bandung: {
        name: 'Bandung',
        icon: '',
        tempC: '',
      },
      bali: {
        name: 'Bali',
        icon: '',
        tempC: '',
      },
      surabaya: {
        name: 'Surabaya',
        icon: '',
        tempC: '',
      },
      yogyakarta: {
        name: 'Yogyakarta',
        icon: '',
        tempC: '',
      },
      jakarta: {
        name: 'Jakarta',
        icon: '',
        tempC: '',
      },
    };

    const tiles = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    const locations = [
      { id: 501212, name: 'Bandung', coordinates: [-6.90992, 107.64691] },
      { id: 501164, name: 'Bali', coordinates: [-8.64348, 115.224609] },
      { id: 501306, name: 'Surabaya', coordinates: [-7.27981, 112.71109] },
      { id: 501190, name: 'Yogyakarta', coordinates: [-7.80279, 110.37625] },
      { id: 501195, name: 'Jakarta', coordinates: [-6.176396, 106.826591] },
    ];
    
    locations.forEach((location) => {
      this.dataCuacaService.getMarkerCuacaPopUp(location.id).subscribe((data) => {
        const icon = data[2].kodeCuaca;
        const tempC = data[2].tempC;
    
        const marker = L.marker(location.coordinates as L.LatLngTuple) // Konversi ke LatLngTuple
          .addTo(this.map)
          .bindPopup(
            `<div class="flex flex-col items-center justify-center">
              <h3>${location.name}</h3>
              <img src="${this.getImgWeather(icon)}" alt="Gambar" width="40">
              <p>${tempC}<sup>o</sup>C</p>
            </div>`
          )
          .openPopup();
      });
    });
    
  }
  getImgWeather(icon: string): string {
    switch (icon) {
      case "0":
        return '../../assets/img/sunny.png';
      case "1":
        return '../../assets/img/cloudly.png';
      case "2":
        return '../../assets/img/rainy.png';
      case "3":
        return '../../assets/img/storm.png';
      default:
        return '';
    }
  }
  onSearchClick() {
    this.router.navigate(['/cities']);
  }
  
}
