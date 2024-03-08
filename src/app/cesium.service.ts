import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RectangleNoFly } from './objects/rectangle-no-fly/rectangle-no-fly';
import { PolygonNoFly } from './objects/polygon-no-fly/polygon-no-fly';
import { EllipsoidNoFly } from './objects/ellipsoid-no-fly/ellipsoid-no-fly';
import { GetNoFlyZonesResponse } from './objects/get-no-fly-zones-response/get-no-fly-zones-response';
import { getNoFlyZonesConflictResponse } from './objects/get-no-fly-zones-conflict-response/get-no-fly-zones-conflict-response';
import { Observable, tap } from 'rxjs';
import { GetFlightLocationResponse } from './objects/get-flight-location-response/get-flight-location-response';
import { MilitaryBase } from './objects/military-base/military-base';
import {
  FlightDataFa_Id,
  FlightDataIdent,
  Operator,
} from './objects/aero-api/flight-data';
import { TfrNoFly } from './objects/tfr-no-fly/tfr-no-fly';
import { Url } from '../lib/utils/url';

import { PlaceholderRepository } from './objects/placeholder-repository/placeholder-repository';//PLACEHOLDER

declare const Cesium: any;

// TODO: Consider hiding this api token so it is not stored on the front-end
Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNzIyMjA2MC02ZDY2LTQ1YmUtYjc0Yi05MzFhY2ViZWNkMWUiLCJpZCI6MTIzOTU4LCJpYXQiOjE2NzU4OTY5MzV9.iWKvQ4p-2joQPJ4o3vMeT3HDeBkyKb5ijeA87NEppa4';

@Injectable({
  providedIn: 'root',
})
export class CesiumService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      key: 'x-api-key',
      value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
    }),
  };

  // Needed so you can add params to http calls without messing up other service calls
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    key: 'x-api-key',
    value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
  });

  aeroHttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    key: 'x-apikey',
    value: 'Lrpf86qKGBqgB8xwBvsFK0dMPhcqByAj',
  });

  constructor(public httpClient: HttpClient) {}

  ellipsoidNoFly: EllipsoidNoFly = new EllipsoidNoFly();
  rectangleNoFly: RectangleNoFly = new RectangleNoFly();
  militaryBase: MilitaryBase = new MilitaryBase();
  polygonNoFly: PolygonNoFly = new PolygonNoFly();
  tfrNoFly: TfrNoFly = new TfrNoFly();
  getNoFlyZoneResponse: GetNoFlyZonesResponse;
  getTfrNoFlyZoneResponse: GetNoFlyZonesResponse;
  getNoFlyZoneConflictResponse: getNoFlyZonesConflictResponse;
  prevFlightLabel: string;
  global_viewer: any;
  global_coord_map: Map<string, number[]> = new Map<string, number[]>();
  conflictFlights: string[];
  pointsMap: Map<string, any[]> = new Map<string, any[]>();
  entities: any;
  ellipsoids: any;
  rectangles: any;
  polygons: any;
  militaryBases: any;
  aeroFlightIdentResponse: FlightDataIdent;
  aeroFlightFaIdResponse: FlightDataFa_Id;
  aeroOperatorResponse: Operator;

  placeholderRepository: PlaceholderRepository = new PlaceholderRepository();//PLACEHOLDER
  
  public updateFlightsAndZones(
    div: string,
    longitude: number,
    latitude: number,
    altitude: number,
    flightIdent_Icao: string,
    airlineName: string | undefined,
    flightFaIdRespObj: FlightDataFa_Id | undefined
  ): void {
    // Sets up cesium viewer
    this.setUpViewer(div);

    // Load all no custom fly zones from database into cesium
    this.getAndLoadNoFlyZones();

    this.getAndLoadTfrNoFlyZones();
    // Plots new flight point
    this.flyToAndPlotPoint(
      longitude,
      latitude,
      altitude,
      flightIdent_Icao,
      airlineName,
      flightFaIdRespObj
    );
  }

  public setUpViewer(div: string): void {
    // Setting up viewer. Checks to make sure it doesn't exist before creating a new one
    Cesium.Math.setRandomNumberSeed(1234);
    if (this.global_viewer == null || this.global_viewer == undefined) {
      this.global_viewer = new Cesium.Viewer(div, {
        animation: false,
        timeline: false,
      });
      this.entities = this.global_viewer.entities;
      this.ellipsoids = this.entities.add(new Cesium.Entity());
      this.rectangles = this.entities.add(new Cesium.Entity());
      this.polygons = this.entities.add(new Cesium.Entity());
      this.militaryBases = this.entities.add(new Cesium.Entity());

      // Sets up frontend placeholder repository. Only necessary for testing without a backend.
      this.placeholderRepository.setUpRepository();//PLACEHOLDER
    }
  }

  public hidePolygonNoFlys() {
    this.polygons.show = !this.polygons.show;
  }

  public hideRectangleNoFlyz() {
    this.rectangles.show = !this.rectangles.show;
  }

  public hideEllipsoidNoFlyz() {
    this.ellipsoids.show = !this.ellipsoids.show;
  }

  public hideMilitaryBasesNoFlyz() {
    this.militaryBases.show = !this.militaryBases.show;
  }

  public hideSelected() {
    this.global_viewer.selectedEntity.show =
      !this.global_viewer.selectedEntity.show;

    let parentId = this.global_viewer.selectedEntity.id;

    this.global_viewer.entities.values.forEach((element: any) => {
      if (element.parent != undefined && element.parent.id == parentId) {
        element.show = !element.show;
      }
    });
  }

  public resetEntities() {
    const list: any[] = [];
    this.global_viewer.entities.values.forEach((element: any) => {
      if (element.show) {
        list.push(element);
        console.log('NOT SHOWING' + element.id);
      }
    });

    if (list.length > 0) {
      list.forEach((element) => {
        this.global_viewer.entities.getById(element.id).show = true;
      });
    }
  }

  public addEllipsoidNoFlyZone(noFlyIn: any) {
    this.placeholderRepository.addEllipsoidNoFlyZone(noFlyIn);
    this.getAndLoadNoFlyZones();
  }

  public addRectangleNoFlyZone(noFlyIn: any) {
    this.placeholderRepository.addRectangleNoFlyZone(noFlyIn);
  }

  public addPolygonNoFlyZone(noFlyIn: any) {
    this.placeholderRepository.addPolygonNoFlyZone(noFlyIn);
  }

  public deleteNoFlyZone() {
    let entity = this.global_viewer.selectedEntity.id;
    let zoneName = this.global_viewer.selectedEntity.name;

    this.global_viewer.entities.removeById(entity);
    let queryParams = new HttpParams();
    queryParams = queryParams.append('zoneName', zoneName);

    //PLACEHOLDER
    this.placeholderRepository.deleteNoFlyZone(zoneName);
    //THE ABOVE IS A PLACEHOLDER FOR THE FOLLOWING COMMENTED-OUT CODE
    /*
    this.httpClient
      .get<string>(Url.consumer("/deleteNoFlyZone"), {
        headers: this.httpHeaders,
        params: queryParams,
      })
      .subscribe((response) => {
        console.log('Getting RESPONSE ' + response);
      });
      */
  }

  public flyToNoFlyZone(zoneName: string) {
    this.global_viewer.entities.values.forEach((element: any) => {
      if (element.name == zoneName) {
        this.global_viewer.zoomTo(element);
      }
      if (element.name == zoneName) {
        this.global_viewer.zoomTo(element);
      }
    });
  }

  public findFlight(flightIcao: string) {
    this.global_viewer.entities.values.forEach((element: any) => {
      if (element.id == 'Flight ICAO: ' + flightIcao) {
        this.global_viewer.zoomTo(element);
      }
    });
  }

  public getTrackedFlights(): string[] {
    const trackedFlights: string[] = [];

    this.global_coord_map.forEach((value: number[], key: string) => {
      trackedFlights.push(key);
    });
    return trackedFlights;
  }

  private checkInNoFly(
    longitude: number,
    latitude: number,
    altitude: number,
    flightLabel: string
  ): Observable<getNoFlyZonesConflictResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('longitude', longitude);
    queryParams = queryParams.append('latitude', latitude);
    queryParams = queryParams.append('altitude', altitude);

    return this.httpClient
      .get<getNoFlyZonesConflictResponse>(
        Url.consumer('/getInNoFlyZone'),
        {
          headers: this.httpHeaders,
          params: queryParams,
        }
      )
      .pipe(
        tap((response) => {
          this.getNoFlyZoneConflictResponse = response;
        })
      );
  }

  private getFlightLocation(
    longitude: number,
    latitude: number,
    flightLabel: string
  ): Observable<GetFlightLocationResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('longitude', longitude);
    queryParams = queryParams.append('latitude', latitude);

    return this.httpClient
      .get<GetFlightLocationResponse>(
        Url.consumer('/getFlightLocation'),
        {
          headers: this.httpHeaders,
          params: queryParams,
        }
      )
      .pipe(
        tap((response) => {
          console.log('Flight location response recieved' + response.location);
        })
      );
  }

  public async makePlane(
    view: any,
    name: string,
    long: number,
    lat: number,
    alt: number
  ) {
    // If plane exists
    if (view.entities.getById(name)) {
      let oldAirplane = view.entities.getById(name);

      // Move plane and change scale
      if (!(long == 0 && lat == 0 && alt == 0)) {
        let newPosition = Cesium.Cartesian3.fromDegrees(long, lat, alt);

        let direction = Cesium.Cartesian3.subtract(
          newPosition,
          oldAirplane._position._value,
          new Cesium.Cartesian3()
        );
        Cesium.Cartesian3.normalize(direction, direction);

        let rotationMatrix =
          Cesium.Transforms.rotationMatrixFromPositionVelocity(
            oldAirplane._position._value,
            direction
          );

        oldAirplane._position._value = newPosition;

        let newOrientation = new Cesium.Quaternion();
        Cesium.Quaternion.fromRotationMatrix(rotationMatrix, newOrientation);
        oldAirplane.orientation = newOrientation;
      }
      let distance = Cesium.Cartesian3.distance(
        oldAirplane._position._value,
        view.camera.position
      );
      oldAirplane._model._scale._value = distance / (100 + distance / 10000);
    } else {
      // If this is a new plane, make it
      view.entities.remove(view.entities.getById(name));
      let newPosition = Cesium.Cartesian3.fromDegrees(long, lat, alt);
      let distance = Cesium.Cartesian3.distance(
        newPosition,
        view.camera.position
      );

      const pUri = await Cesium.IonResource.fromAssetId(1662340);
      let airplane = {
        id: name,
        name: name,
        position: newPosition,
        model: {
          uri: pUri,

          scale: distance / (100 + distance / 10000),
        },
      };
      view.entities.add(airplane);
    }
  }

  public getAndLoadNoFlyZones(): void {
    console.log('Loading No FlyZones');

    //PLACEHOLDER
    this.getNoFlyZoneResponse = this.placeholderRepository.getNoFlyZonesResponse;
    //THE ABOVE IS A PLACEHOLDER FOR THE FOLLOWING COMMENTED-OUT CODE
    /*
    this.httpClient
      .get<GetNoFlyZonesResponse>(
        Url.consumer('/get-no-fly-zones'),
        this.httpOptions
      )
      .subscribe((data) => {
        this.getNoFlyZoneResponse = data;
        */
        //console.log('ELLIPSOID NO FLY ZONES')
        for (const ellipsoidNoFly of this.getNoFlyZoneResponse
          .ellipsoidNoFlyZones) {
          let contains: boolean = false;
          this.global_viewer.entities.values.forEach((element: any) => {
            if (element.name == ellipsoidNoFly.name) {
              contains = true;
            }
          });

          if (!contains) {
            this.global_viewer.entities.add({
              parent: this.ellipsoids,
              name: ellipsoidNoFly.name,
              position: Cesium.Cartesian3.fromDegrees(
                Number(ellipsoidNoFly.longitude),
                Number(ellipsoidNoFly.latitude),
                Number(ellipsoidNoFly.altitude)
              ),
              ellipsoid: {
                radii: new Cesium.Cartesian3(
                  ellipsoidNoFly.longRadius,
                  ellipsoidNoFly.latRadius,
                  ellipsoidNoFly.altRadius
                ),
                material: Cesium.Color.RED.withAlpha(0.5),
              },
            });
            //console.log(ellipsoidNoFly)
          }
        }

        //console.log('RECTANGLE NO FLY ZONE')
        for (const rectangleNoFly of this.getNoFlyZoneResponse
          .rectangleNoFlyZones) {
          let contains: boolean = false;
          this.global_viewer.entities.values.forEach((element: any) => {
            if (element.name == rectangleNoFly.name) {
              contains = true;
            }
          });

          if (!contains) {
            this.global_viewer.entities.add({
              parent: this.rectangles,
              name: rectangleNoFly.name, // String name
              rectangle: {
                rotation: Cesium.Math.toRadians(
                  Number(rectangleNoFly.rotationDegree)
                ), // .toRadians( rotation value )
                extrudedHeight: Number(rectangleNoFly.minAltitude), //Minimum Height
                height: Number(rectangleNoFly.maxAltitude),
                material: Cesium.Color.TEAL.withAlpha(0.5),
                coordinates: Cesium.Rectangle.fromDegrees(
                  Number(rectangleNoFly.westLongDegree),
                  Number(rectangleNoFly.southLatDegree),
                  Number(rectangleNoFly.eastLongDegree),
                  Number(rectangleNoFly.northLatDegree)
                ),
              },
            });
            // console.log(rectangleNoFly)
          }
        }

        //console.log('POLYGON NO FLY ZONE')
        for (const polygonNoFly of this.getNoFlyZoneResponse
          .polygonNoFlyZones) {
          let contains: boolean = false;
          this.global_viewer.entities.values.forEach((element: any) => {
            if (element.name == polygonNoFly.name) {
              contains = true;
            }
          });

          if (!contains) {
            this.global_viewer.entities.add({
              parent: this.polygons,
              name: polygonNoFly.name, //String Name

              polygon: {
                hierarchy: {
                  positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                    polygonNoFly.vertex1Long,
                    polygonNoFly.vertex1Lat,
                    polygonNoFly.maxAltitude,
                    polygonNoFly.vertex2Long,
                    polygonNoFly.vertex2Lat,
                    polygonNoFly.maxAltitude,
                    polygonNoFly.vertex3Long,
                    polygonNoFly.vertex3Lat,
                    polygonNoFly.maxAltitude,
                    polygonNoFly.vertex4Long,
                    polygonNoFly.vertex4Lat,
                    polygonNoFly.maxAltitude,
                  ]),

                  //shapeValues: Array ordered: vertex 1 Longitude, vertex 1 Latitude, max height, vertex 2 Longitude, vertex 2 Latitude, max height, ...
                },
                extrudedHeight: polygonNoFly.minAltitude, //int minimum height
                perPositionHeight: true,
                material: Cesium.Color.VIOLET.withAlpha(0.5),
              },
            });
          }
        }

        //console.log("MILITARY NO FLY ZONES")
        for (const militaryBase of this.getNoFlyZoneResponse
          .militaryNoFlyZones) {
          let data = JSON.parse(militaryBase.geoJson);

          let contains: boolean = false;
          this.global_viewer.entities.values.forEach((element: any) => {
            if (element.name == militaryBase.name) {
              contains = true;
            }
          });

          let coords = data.coordinates.toString();
          let coordArray = coords.split(',');

          for (let i = 0; i < coordArray.length; i++) {
            coordArray[i] = parseFloat(coordArray[i]);
          }

          if (!contains) {
            this.global_viewer.entities.add({
              parent: this.militaryBases,
              name: militaryBase.name, //String Name
              polygon: {
                hierarchy: {
                  positions: Cesium.Cartesian3.fromDegreesArray(coordArray),
                  //shapeValues: Array ordered: vertex 1 Longitude, vertex 1 Latitude, max height, vertex 2 Longitude, vertex 2 Latitude, max height, ...
                },
                extrudedHeight: 30000, //int minimum height
                perPositionHeight: true,
                material: Cesium.Color.SALMON.withAlpha(0.5),
              },
            });
          }
        }
  //    });
  }


  public getAndLoadTfrNoFlyZones(): void {
    console.log('Loading TFR No FlyZones');

    this.httpClient
      .get<GetNoFlyZonesResponse>(
        Url.consumer('/getTfrNoFlyZones'),
        this.httpOptions
      )
      .subscribe((data) => {
        this.getTfrNoFlyZoneResponse = data;

        console.log('TFR NO FLY ZONES')
        console.log(this.getTfrNoFlyZoneResponse);
        for (const tfrNoFly of this.getTfrNoFlyZoneResponse.tfrNoFlyZones) {
          
          if(tfrNoFly.notamType === "BOUNDARY") {
            console.log('Boundary')
            this.global_viewer.entities.add( {
              polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(tfrNoFly.latlong),
                height: 0,
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: true,
                outlineColor: Cesium.Color.BLACK,
              },
            }
            );
          }

          if(tfrNoFly.notamType === "RADIUS") {
            this.global_viewer.entities.add({
              name: tfrNoFly.notamNumber,
              position: Cesium.Cartesian3.fromDegrees(
                tfrNoFly.latlong[0], tfrNoFly.latlong[1]
              ),
              ellipse: {
                semiMinorAxis: tfrNoFly.radius,
                semiMajorAxis: tfrNoFly.radius,
                height: 0.0,
                material: Cesium.Color.RED,
                outline: true, // height must be set for outline to display
              },
            });
          }
          //console.log(ellipsoidNoFly)
          
        }
        
      });
  }


  flyToAndPlotPoint(
    longitude: number,
    latitude: number,
    altitude: number,
    flightIdent_Icao: string,
    airlineName: string | undefined,
    flightFaIdRespObj: FlightDataFa_Id | undefined
  ) {
    if (flightFaIdRespObj) {
      this.aeroFlightFaIdResponse = flightFaIdRespObj;
    }

    let airlineNmVal = airlineName ?? '';

    if (!this.global_coord_map.has(flightIdent_Icao)) {
      this.global_coord_map.set(flightIdent_Icao, []);
    }
    if (!this.pointsMap.has(flightIdent_Icao)) {
      this.pointsMap.set(flightIdent_Icao, []);
    }

    let current_coordinates = this.global_coord_map.get(flightIdent_Icao);

    let prevVals: number[] | undefined;
    let prevLong: number = 0;
    let prevLat: number = 0;
    let prevAlt: number = 0;
    let location_has_changed: boolean = true;

    if (current_coordinates != undefined && current_coordinates?.length > 0) {
      prevVals = current_coordinates?.slice(
        Math.max(current_coordinates.length - 3, 0)
      );
      console.log('sliced array: ' + prevVals);

      if (prevVals.length == 3) {
        prevLong = prevVals[0];
        prevLat = prevVals[1];
        prevAlt = prevVals[2];
        location_has_changed =
          longitude != prevLong || latitude != prevLat || altitude != prevAlt;
        console.log('location_has_changed: ' + location_has_changed);
      }
    }

    if (location_has_changed) {
      if (current_coordinates != undefined) {
        current_coordinates.push(longitude);
        current_coordinates.push(latitude);
        current_coordinates.push(altitude);
      }
    }

    if (
      !this.global_viewer.entities.getById('Flight ICAO: ' + flightIdent_Icao)
    ) {
      this.global_viewer.camera.moveEnd.addEventListener(() =>
        this.makePlane(
          this.global_viewer,
          'Flight ICAO: ' + flightIdent_Icao,
          0,
          0,
          0
        )
      );
    }

    // Making a line with the stored coordinates
    if (location_has_changed && current_coordinates) {
      this.global_viewer.entities.add({
        name: flightIdent_Icao,
        parent: this.global_viewer.entities.getById(
          'Flight ICAO: ' + flightIdent_Icao
        ),
        polyline: {
          positions:
            Cesium.Cartesian3.fromDegreesArrayHeights(current_coordinates),
          width: 10,
          material: Cesium.Color.PURPLE,
          clampToGround: false,
        },
      });
    }
    if (location_has_changed) {
      this.makePlane(
        this.global_viewer,
        'Flight ICAO: ' + flightIdent_Icao,
        longitude,
        latitude,
        altitude
      ).then((wait) => {
        if (this.aeroFlightFaIdResponse && flightFaIdRespObj != null) {
          this.httpClient
            .get<FlightDataIdent>(
              Url.producer('/flightident/') + flightIdent_Icao,
              this.httpOptions
            )
            .subscribe((flightResponse) => {
              this.aeroFlightIdentResponse = flightResponse;
              if (this.aeroFlightIdentResponse) {
                this.httpClient
                  .get<Operator>(
                    Url.producer('/operator/') +
                      this.aeroFlightIdentResponse.operator,
                    this.httpOptions
                  )
                  .subscribe((operatorResponse) => {
                    this.aeroOperatorResponse = operatorResponse;
                    airlineNmVal = operatorResponse.name;
                    // console.log(operatorResponse)
                    console.log('airline: ' + airlineNmVal);

                    this.getFlightLocation(
                      longitude,
                      latitude,
                      flightIdent_Icao
                    ).subscribe((response) => {
                      this.checkInNoFly(
                        longitude,
                        latitude,
                        altitude,
                        flightIdent_Icao
                      ).subscribe((data) => {
                        let point: any;

                        this.global_viewer.entities.values.forEach(
                          (element: any) => {
                            if (
                              element.id ==
                              'Flight ICAO: ' + flightIdent_Icao
                            ) {
                              point = element;
                            }
                          }
                        );

                        if (data.inConflict) {
                          point.description = point.description = `
                            <p>Flight ICAO: ${flightIdent_Icao} is in no fly zone: ${data.noFlyZoneName}<br>
                            For Airline: ${airlineNmVal}</p><br>
                            Flight location is over ${response.location}<br>
                            Origin Place: ${flightFaIdRespObj?.origin.name}<br>
                            Takeoff Time: ${flightFaIdRespObj?.actual_off}<br>
                            Destination: ${flightFaIdRespObj?.destination?.name}<br>
                            GroundSpeed: ${flightFaIdRespObj?.last_position?.groundspeed}<br>
                            Flight Latitude: ${latitude}<br>
                            Flight Longitude: ${longitude}<br>
                            Flight Altitude: ${altitude}<br>
                            Altitude Change: ${flightFaIdRespObj?.last_position?.altitude_change}<br>
                            Heading: ${flightFaIdRespObj?.last_position?.heading}<br>
                            Aircraft Type: ${flightFaIdRespObj?.aircraft_type}<br>
                            Time latest position received: ${flightFaIdRespObj?.last_position?.timestamp}
                          `;

                          this.global_viewer.selectedEntity = point;
                          point.billboard = {
                            image: '/assets/images/WarningLabel.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset: new Cesium.Cartesian2(0, 35),
                            width: 57,
                            height: 15,
                          };
                        } else {
                          point.description = point.description = `
                          <p>Flight ICAO: ${flightIdent_Icao} is over ${response.location}<br>
                          Airline: ${airlineNmVal}<br>
                          Origin Place: ${flightFaIdRespObj?.origin.name}<br>
                          Takeoff Time: ${flightFaIdRespObj?.actual_off}<br>
                          Destination: ${flightFaIdRespObj?.destination?.name}<br>
                          GroundSpeed: ${flightFaIdRespObj?.last_position?.groundspeed}<br>
                          Flight Latitude: ${latitude}<br>
                          Flight Longitude: ${longitude}<br>
                          Flight Altitude: ${altitude}<br>
                          Altitude Change: ${flightFaIdRespObj?.last_position?.altitude_change}<br>
                          Heading: ${flightFaIdRespObj?.last_position?.heading}<br>
                          Aircraft Type: ${flightFaIdRespObj?.aircraft_type}<br>
                          Time latest position received: ${flightFaIdRespObj?.last_position?.timestamp}
                        </p>`;

                          point.billboard = undefined;
                        }
                      });
                    });
                  });
              }
            });
        } else {
          //If basically flight is generated
          this.getFlightLocation(
            longitude,
            latitude,
            flightIdent_Icao
          ).subscribe((response) => {
            this.checkInNoFly(
              longitude,
              latitude,
              altitude,
              flightIdent_Icao
            ).subscribe((data) => {
              let point: any;
              this.global_viewer.entities.values.forEach((element: any) => {
                if (element.id == 'Flight ICAO: ' + flightIdent_Icao) {
                  point = element;
                }
              });

              if (data.inConflict) {
                point.description = `
                  <b>This is a mock generated flight</b><br>
                  <p>Flight ICAO: ${flightIdent_Icao} is in no fly zone: ${data.noFlyZoneName}<br>
                  For Airline: ${airlineName}</p><br>
                  Flight location is over ${response.location}<br>
                  Flight Latitude: ${latitude}<br>
                  Flight Longitude: ${longitude}<br>
                  Flight Altitude: ${altitude}
                `;

                this.global_viewer.selectedEntity = point;
                point.billboard = {
                  image: '/assets/images/WarningLabel.png',
                  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  pixelOffset: new Cesium.Cartesian2(0, 35),
                  width: 57,
                  height: 15,
                };
              } else {
                point.description = `
                  <b>This is a mock generated flight</b><br>
                  <p>Flight ICAO: ${flightIdent_Icao} is over ${response.location}<br>
                  Airline: ${airlineName}<br>
                  Flight Latitude: ${latitude}<br>
                  Flight Longitude: ${longitude}<br>
                  Flight Altitude: ${altitude}
                `;

                point.billboard = undefined;
              }
            });
          });
        }
      });
    }
  }
}
