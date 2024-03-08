import { Injectable } from '@angular/core';
import '../polyfills'
import { CesiumService } from './cesium.service';
import { Url } from './utils/url';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { FlightDataFa_Id, Position } from './objects/aero-api/flight-data';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private cesium: CesiumService) { }
  private stompClient: any;

  connectToConsumer() {
    const socket = new SockJS(Url.consumer('/consumer-socket'));
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/liveCoords', (data: { body: string; }) => {
        console.log(data)
       // console.log(data.body)

        let jsonDataObj = JSON.parse(data.body);
        if (jsonDataObj.error) {
          console.log("An error response was received from the Producer. Nothing will be updated. Error Details: " + jsonDataObj.error)
          //TODO:Create an error response dialog or something like that
          return;
        }

        let latitudeVal: number = -999;
        let longitudeVal: number = -999;
        let altitudeVal: number = -999;

        let flightIdent_Icao: string = "";
        let flightDataFa_Id: FlightDataFa_Id | undefined;
        let airlineName: string | undefined;

        if (jsonDataObj.generate) {
          interface LiveData {
            latitude: number;
            longitude: number;
            altitude: number;
          }

          let liveObj: LiveData = JSON.parse(jsonDataObj.live)
          let flightIcao: string;

          latitudeVal = liveObj.latitude;
          longitudeVal = liveObj.longitude;
          altitudeVal = liveObj.altitude;

          airlineName = jsonDataObj.airline;
          flightIcao = jsonDataObj.icao;

          flightIdent_Icao = flightIcao;
          flightDataFa_Id = undefined;

          console.log(liveObj);
          console.log("ALT: " + liveObj.altitude);
          console.log("LAT: " + liveObj.latitude);
          console.log("LONG: " + liveObj.longitude);
        }

        if (jsonDataObj.flight) {
          flightDataFa_Id = JSON.parse(jsonDataObj.flight);
          console.log(flightDataFa_Id);

          if (flightDataFa_Id) {
            let position: Position = flightDataFa_Id.last_position;
            console.log(position)

            latitudeVal = position.latitude;
            longitudeVal = position.longitude;
            altitudeVal = position.altitude * 100; // For some reason altitude is only 300 when it should be 30000 for example

            flightIdent_Icao = flightDataFa_Id.ident;
          }
        }

        if (longitudeVal != -999 && latitudeVal != -999 && altitudeVal != -999) {
          this.cesium.updateFlightsAndZones("cesium", longitudeVal, latitudeVal, altitudeVal, flightIdent_Icao, airlineName, flightDataFa_Id);
        }
      })
    })
  }
}
