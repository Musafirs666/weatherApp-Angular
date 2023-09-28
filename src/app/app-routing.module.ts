import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CitiesComponent } from './cities/cities.component';
import { MapComponent } from './map/map.component';
import { SettingComponent } from './setting/setting.component';
import { NotFoundPageComponent } from './404Page/not-found-page/not-found-page.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'\home', component: HomepageComponent},
  {path:'\cities', component: CitiesComponent},
  {path:'\map', component: MapComponent},
  {path:'\setting', component: SettingComponent},
  {path:'\**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
