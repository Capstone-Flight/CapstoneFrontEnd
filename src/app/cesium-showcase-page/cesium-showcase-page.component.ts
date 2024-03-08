import { Component, OnChanges, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenerateFlightRequest } from '../objects/generate-flight/generate-flight-request';
import { MatDialog } from '@angular/material/dialog';
import { FlightGenerateDialog } from '../flight-generate-dialog/flight-generate-dialog.component';
import { CesiumService } from '../cesium.service';
import { NoFlyZoneGenerateDialog } from '../no-fly-zone-generate-dialog/no-fly-zone-generate-dialog.component';
import { AirportGenerateFlightRequest } from '../objects/generate-flight/airport-generate-flight-request';
import { Url } from '../../lib/utils/url';

@Component({
  selector: 'app-cesium-showcase',
  templateUrl: './cesium-showcase-page.component.html',
  styleUrls: ['./cesium-showcase-page.component.css']
})
export class CesiumShowcaseComponent implements OnInit, OnChanges {

  search: string = '';
  flight_icao_list: string[] = [];
  tracked_flight_list: string[] =[];
  are_flights_visible: boolean = true;
  are_tracked_visible: boolean = false;
  gen_airline_name: string;
  gen_flight_icao: string;
  gen_degreeOfChange: number;
  gen_longitude: number;
  gen_latitude: number;
  gen_altitude: number;
  flight_id_map: Map<string, string>;  


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


  constructor(private httpClient: HttpClient,
    public dialog: MatDialog,
    private cesium: CesiumService) { }

  getLiveFlightIcaos(): void {
    this.flight_id_map = new Map<string,string>();
    this.httpClient.get<string>(Url.producer('/flighticao/getLive'), this.httpOptions).subscribe(data => {
      // console.log(JSON.parse(JSON.stringify(data)).icaos)

      let jsonData = JSON.parse(JSON.stringify(data));

      let jsonFaIds = jsonData.faids;


      if (jsonFaIds) {
        this.flight_icao_list = jsonFaIds.split(",");
      }

    })

  }

  ngOnInit(): void {
    this.getLiveFlightIcaos();
    this.cesium.setUpViewer("cesium");
    this.cesium.getAndLoadNoFlyZones();
    this.cesium.getAndLoadTfrNoFlyZones();
  }

  ngOnChanges(): void {
    console.log('t')
  }

  getTrackedFlights() {
    this.tracked_flight_list = this.cesium.getTrackedFlights();
    this.are_tracked_visible = !this.are_tracked_visible;
  }
  findFlight(flight : string){
      this.cesium.findFlight(flight);
  }

  setFlightIcao(icao: string): void {
    this.search = icao;
  }

  getFlightInfo(): void {
    console.log("getting Flight Info")
    this.httpClient.get<string>(Url.producer('/flightfaid/') + this.search, this.httpOptions).subscribe(data => {
      // console.log(data);
    })
    this.are_flights_visible = false;
  }

  toggleFlightsVisible(): void {
    this.are_flights_visible = !this.are_flights_visible;
  }

  generateMockFlight(): void {
    this.are_flights_visible = false;
    let generateRequest: GenerateFlightRequest | AirportGenerateFlightRequest;
    const dialogRef = this.dialog.open(FlightGenerateDialog, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.departAirport && result.departAirport) {
        generateRequest = new AirportGenerateFlightRequest();
        generateRequest.setAirlineName(result.airline);
        generateRequest.setFlightIcao(result.icao);
        generateRequest.setArriveAirport(result.arriveAirport)
        generateRequest.setDepartAirport(result.departAirport)

        this.httpClient.post<string>(Url.producer('/airport/generate'), generateRequest, this.httpOptions).subscribe(data => {
        })
      } else {
        
        generateRequest = new GenerateFlightRequest();
        generateRequest.setAirlineName(result.airline);
        generateRequest.setFlightIcao(result.icao);
        generateRequest.setLongitude(result.longitude);
        generateRequest.setLatitude(result.latitude);
        generateRequest.setAltitude(result.altitude);
        generateRequest.setLongitudeChange(result.longChange)
        generateRequest.setLatitudeChange(result.latChange)
        generateRequest.setAltitudeChange(result.altChange)

        this.httpClient.post<string>(Url.producer('/custom/generate'), generateRequest, this.httpOptions).subscribe(data => {
        })
      }

    })
  }

  addNoFlyZone(): void {
    this.are_flights_visible = false;
    const dialogRef = this.dialog.open(NoFlyZoneGenerateDialog, {
      data: {}
    });
  }

}
