import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GetNoFlyZonesResponse } from 'src/app/objects/get-no-fly-zones-response/get-no-fly-zones-response';
import { Url } from 'src/lib/utils/url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  constructor(private httpClient: HttpClient) { }

  getNoFlyZoneResponse: GetNoFlyZonesResponse;

  ngOnInit() {
    this.httpClient.get<GetNoFlyZonesResponse>(Url.consumer('/get-no-fly-zones'), this.httpOptions).subscribe(data => {
      this.getNoFlyZoneResponse = data;

      console.log(data)

      console.log('ELLIPSOID NO FLY ZONES')
      for (const ellipsoidNoFly of this.getNoFlyZoneResponse.ellipsoidNoFlyZones) {
        console.log(ellipsoidNoFly)
      }

      console.log('RECTANGLE NO FLY ZONE')
      for (const rectangleNoFly of this.getNoFlyZoneResponse.rectangleNoFlyZones) {
        console.log(rectangleNoFly)
      }

      console.log('POLYGON NO FLY ZONE')
      for (const polygonNoFly of this.getNoFlyZoneResponse.polygonNoFlyZones) {
        console.log(polygonNoFly)
      }

    })
  }

}
