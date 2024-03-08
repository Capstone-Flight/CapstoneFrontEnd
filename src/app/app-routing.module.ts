import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoFlyZoneComponent } from './add-no-fly-zone/add-no-fly-zone/add-no-fly-zone.component';
import { HomeComponent } from './home/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { CesiumShowcaseComponent } from './cesium-showcase-page/cesium-showcase-page.component';
import { FlightTrackerDashboardComponent } from './flight-tracker-dashboard/flight-tracker-dashboard.component';

const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: FlightTrackerDashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: FlightTrackerDashboardComponent,
  },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'add-no-fly-zone',
    component: AddNoFlyZoneComponent,
    title: 'No Fly Zone',
  },
  {
    path: 'showcase',
    component: CesiumShowcaseComponent,
    title: 'Flight Tracker',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Oops! Page not found!',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
