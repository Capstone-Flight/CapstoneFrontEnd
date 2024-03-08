import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumComponentComponent } from './cesium-component/cesium-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home/home.component';
import { FlightSearchComponent } from './flight-search/flight-search/flight-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found/page-not-found.component';
import { AddNoFlyZoneComponent } from './add-no-fly-zone/add-no-fly-zone/add-no-fly-zone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightTrackingPageComponent } from './flight-tracking-page/flight-tracking-page/flight-tracking-page.component';
import { FlightDetailsComponent } from './flight-details/flight-details/flight-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RectangleNoFlyZoneComponent } from './no-fly-zone-types/rectangle-no-fly-zone/rectangle-no-fly-zone/rectangle-no-fly-zone.component';
import { EllipsoidNoFlyZoneComponent } from './no-fly-zone-types/ellipsoid-no-fly-zone/ellipsoid-no-fly-zone/ellipsoid-no-fly-zone.component';
import { CustomPolygonNoFlyZoneComponent } from './no-fly-zone-types/custom-polygon-no-fly-zone/custom-polygon-no-fly-zone/custom-polygon-no-fly-zone.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { CesiumShowcaseComponent } from './cesium-showcase-page/cesium-showcase-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NoFlyZoneSubmittedComponent } from './no-fly-zone-types/no-fly-zone-submitted/no-fly-zone-submitted/no-fly-zone-submitted.component';
import { FlightGenerateDialog } from './flight-generate-dialog/flight-generate-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoFlyZoneGenerateDialog } from './no-fly-zone-generate-dialog/no-fly-zone-generate-dialog.component';
import { FlightTrackerDashboardComponent } from './flight-tracker-dashboard/flight-tracker-dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    CesiumComponentComponent,
    HomeComponent,
    FlightSearchComponent,
    PageNotFoundComponent,
    AddNoFlyZoneComponent,
    FlightTrackingPageComponent,
    FlightDetailsComponent,
    RectangleNoFlyZoneComponent,
    EllipsoidNoFlyZoneComponent,
    CustomPolygonNoFlyZoneComponent,
    CesiumShowcaseComponent,
    NoFlyZoneSubmittedComponent,
    FlightGenerateDialog,
    NoFlyZoneGenerateDialog,
    FlightTrackerDashboardComponent,
  ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    FormsModule,
    MatAutocompleteModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
