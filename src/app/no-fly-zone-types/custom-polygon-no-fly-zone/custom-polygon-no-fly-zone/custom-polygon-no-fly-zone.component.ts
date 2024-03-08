import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PolygonNoFly } from 'src/app/objects/polygon-no-fly/polygon-no-fly';
import { NoFlyZoneSubmittedComponent } from '../../no-fly-zone-submitted/no-fly-zone-submitted/no-fly-zone-submitted.component';
import { CesiumService } from 'src/app/cesium.service';
import { Url } from 'src/lib/utils/url';

@Component({
  selector: 'app-custom-polygon-no-fly-zone',
  templateUrl: './custom-polygon-no-fly-zone.component.html',
  styleUrls: ['./custom-polygon-no-fly-zone.component.css']
})
export class CustomPolygonNoFlyZoneComponent {

  polygonNoFly = new PolygonNoFly();
  buttonDisabled = true;

  name: string = '';
  vertex1Long: number;
  vertex1Lat: number;
  vertex2Long: number;
  vertex2Lat: number;
  vertex3Long: number;
  vertex3Lat: number;
  vertex4Long: number;
  vertex4Lat: number;
  maxAltitude: number;
  minAltitude: number;

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
  
  changeName(event: Event): void {
    this.polygonNoFly.name = this.name;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex1Long(event: Event): void {
    this.polygonNoFly.vertex1Long = this.vertex1Long;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex1Lat(event: Event): void {
    this.polygonNoFly.vertex1Lat = this.vertex1Lat;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex2Long(event: Event): void {
    this.polygonNoFly.vertex2Long = this.vertex2Long;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex2Lat(event: Event): void {
    this.polygonNoFly.vertex2Lat = this.vertex2Lat;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex3Long(event: Event): void {
    this.polygonNoFly.vertex3Long = this.vertex3Long;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex3Lat(event: Event): void {
    this.polygonNoFly.vertex3Lat = this.vertex3Lat;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeVertex4Long(event: Event): void {
    this.polygonNoFly.vertex4Long = this.vertex4Long;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }


  changeVertex4Lat(event: Event): void {
    this.polygonNoFly.vertex4Lat = this.vertex4Lat;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeMaxAltitude(event: Event): void {
    this.polygonNoFly.maxAltitude = this.maxAltitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  changeMinAltitude(event: Event): void {
    this.polygonNoFly.minAltitude = this.minAltitude;
    this.buttonDisabled = this.checkForCompleteNoFlyZoneObject()
  }

  checkForCompleteNoFlyZoneObject(): boolean{
    console.log(this.polygonNoFly)
    if (
      this.polygonNoFly.name != null &&
      this.polygonNoFly.vertex1Long != null &&
      this.polygonNoFly.vertex1Lat != null &&
      this.polygonNoFly.vertex2Long != null &&
      this.polygonNoFly.vertex2Lat != null &&
      this.polygonNoFly.vertex3Long != null &&
      this.polygonNoFly.vertex3Lat != null &&
      this.polygonNoFly.vertex4Long != null &&
      this.polygonNoFly.vertex4Lat != null &&
      this.polygonNoFly.maxAltitude != null &&
      this.polygonNoFly.minAltitude != null
    ){
      return false
    } else {
      return true;
    }
  }

  submit(): void {
    //PLACEHOLDER
    this.cesium.addPolygonNoFlyZone(this.polygonNoFly);
    /*
    // TODO
    //WILL MAKE HTTP CALL TO ADD NO FLY ZONE
    this.httpClient.post<string>(Url.consumer('/addNoFlyZone/polygon'),
     this.polygonNoFly, this.httpOptions).subscribe( data => {
      console.log(data);
      this.cesium.getAndLoadNoFlyZones();
    }, error => {
      this.cesium.getAndLoadNoFlyZones();
    })
    */
    document.getElementById("closeDialog")?.click();
    this.cesium.getAndLoadNoFlyZones();
  }
}
