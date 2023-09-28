import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CitiesComponent } from './cities/cities.component';
import { MapComponent } from './map/map.component';
import { SettingComponent } from './setting/setting.component';
import { NavbarComponent } from './sharedComponent/navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DataCuacaService } from './services/data-cuaca.service';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { LaodingScreenComponent } from './loadingScreen/laoding-screen/laoding-screen.component';
import { NotFoundPageComponent } from './404Page/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomepageComponent,
    CitiesComponent,
    MapComponent,
    SettingComponent,
    NavbarComponent,
    LaodingScreenComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMapLibreGLModule
  ],
  providers: [
    DataCuacaService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
