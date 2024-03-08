import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EllipsoidNoFly } from 'src/app/objects/ellipsoid-no-fly/ellipsoid-no-fly';
import { NoFlyZoneSubmittedComponent } from '../../no-fly-zone-submitted/no-fly-zone-submitted/no-fly-zone-submitted.component';
import { CesiumService } from 'src/app/cesium.service';
import { Url } from 'src/lib/utils/url';

@Component({
  selector: 'app-ellipsoid-no-fly-zone',
  templateUrl: './ellipsoid-no-fly-zone.component.html',
  styleUrls: ['./ellipsoid-no-fly-zone.component.css']
})
export class EllipsoidNoFlyZoneComponent implements OnInit, OnChanges{

  ellipsoidNoFly: EllipsoidNoFly = new EllipsoidNoFly();
  buttonDisabled = true;

  name: string = '';
  longitude: number;
  latitude : number;
  altitude: number;
  longitudeRadius: number;
  latitudeRadius: number;
  altRadius: number;

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'key': 'x-api-key',
        'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

    })
};

constructor( 
  private dialog: MatDialog,
  private httpClient: HttpClient,
  private cesium: CesiumService) {}

  ngOnInit(){

  }

  ngOnChanges() {
    console.log(this.ellipsoidNoFly);
  }

  changeName(event: Event): void {
    this.ellipsoidNoFly.name = this.name;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeLongitude(event: Event): void {
    this.ellipsoidNoFly.longitude = this.longitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeLatitude(event: Event): void {
    this.ellipsoidNoFly.latitude = this.latitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeAltitude(event: Event): void {
    this.ellipsoidNoFly.altitude = this.altitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeLongRadius(event: Event): void {
    this.ellipsoidNoFly.longRadius = this.longitudeRadius;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeLatRadius(event: Event): void {
    this.ellipsoidNoFly.latRadius = this.latitudeRadius;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeAltRadius(event: Event): void {
    this.ellipsoidNoFly.altRadius = this.altRadius;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  checkForCompleteNoFlyZoneObject(): boolean{
    console.log(this.ellipsoidNoFly)
    if (
      this.ellipsoidNoFly.name != null &&
      this.ellipsoidNoFly.longitude != null &&
      this.ellipsoidNoFly.latitude != null &&
      this.ellipsoidNoFly.altitude != null &&
      this.ellipsoidNoFly.longRadius != null &&
      this.ellipsoidNoFly.latRadius != null &&
      this.ellipsoidNoFly.altRadius != null
    ){
      return false
    } else {
      return true;
    }
  }

  submit(): void {
    //PLACEHOLDER
    this.cesium.addEllipsoidNoFlyZone(this.ellipsoidNoFly);
    /*
    // TODO
    //WILL MAKE HTTP CALL TO ADD NO FLY ZONE
    this.httpClient.post<string>(Url.consumer('/addNoFlyZone/ellipsoid'),
     this.ellipsoidNoFly, this.httpOptions).subscribe( data => {
      console.log("LOGGING ELLIPNO CUSTOM LGU" + data);
      this.cesium.getAndLoadNoFlyZones();
    },
    error => {
      console.log("LOGGING ELLIP CUSTOM ERROR")
      this.cesium.getAndLoadNoFlyZones();
    })
    */
    document.getElementById("closeDialog")?.click();
    this.cesium.getAndLoadNoFlyZones();

  }

}
