import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RectangleNoFly } from './objects/rectangle-no-fly/rectangle-no-fly';
import { PolygonNoFly } from './objects/polygon-no-fly/polygon-no-fly';
import { EllipsoidNoFly } from './objects/ellipsoid-no-fly/ellipsoid-no-fly';
import { GetNoFlyZonesResponse } from './objects/get-no-fly-zones-response/get-no-fly-zones-response';
import { getNoFlyZonesConflictResponse } from './objects/get-no-fly-zones-conflict-response/get-no-fly-zones-conflict-response';
import { Observable, elementAt, tap } from 'rxjs';
import { GetFlightLocationResponse } from './objects/get-flight-location-response/get-flight-location-response';
import { FlightDetails } from './objects/flight-details/flight-details';
import { MilitaryBase } from './objects/military-base/military-base';

declare let Cesium: any;

// Cesium.Ion.defaultAccessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTE4ZTAwNC1iYjY0LTQ2MmUtOTAzNi0wZDNhY2EyY2MzNTAiLCJpZCI6MTI4NTgxLCJpYXQiOjE2Nzg3NjAzNTB9.1UEATVrKMPSwbEh6ObHPAMs1L99KpJg_pKqMjVDqYDk";
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNzIyMjA2MC02ZDY2LTQ1YmUtYjc0Yi05MzFhY2ViZWNkMWUiLCJpZCI6MTIzOTU4LCJpYXQiOjE2NzU4OTY5MzV9.iWKvQ4p-2joQPJ4o3vMeT3HDeBkyKb5ijeA87NEppa4";

@Injectable({
  providedIn: 'root'
})
export class CesiumService {

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

  // Needed so you can add params to http calls without messing up other service calls
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'key': 'x-api-key',
    'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',

  })

  constructor(public httpClient: HttpClient) {
  }

  ellipsoidNoFly: EllipsoidNoFly = new EllipsoidNoFly();
  rectangleNoFly: RectangleNoFly = new RectangleNoFly();
  militaryBase: MilitaryBase = new MilitaryBase();
  polygonNoFly: PolygonNoFly = new PolygonNoFly();
  getNoFlyZoneResponse: GetNoFlyZonesResponse;
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


  public updateFlightsAndZones(div: string, longitude: number, latitude: number, altitude: number, flightLabel: string, flightDetails: any): void {
    // Sets up cesium viewer
    this.setUpViewer(div);

    // Load all no custom fly zones from database into cesium
    this.getAndLoadNoFlyZones();
    // Plots new flight point
    this.flyToAndPlotPoint(longitude, latitude, altitude, flightLabel, flightDetails);


  }

  public setUpViewer(div: string): void {
    // Setting up viewer. Checks to make sure it doesn't exist before creating a new one
    Cesium.Math.setRandomNumberSeed(1234);
    if (this.global_viewer == null || this.global_viewer == undefined) {
      this.global_viewer = new Cesium.Viewer(div, {
        animation: false,
        timeline: false
      })
      this.entities = this.global_viewer.entities;
    this.ellipsoids = this.entities.add(new Cesium.Entity());
    this.rectangles = this.entities.add(new Cesium.Entity());
    this.polygons = this.entities.add(new Cesium.Entity());
    }
    


  }

  public hidePolygonNoFlys() {
    
    this.polygons.show = !this.polygons.show
  }

  public hideRectangleNoFlyz() {
    this.rectangles.show = !this.rectangles.show
  }

  public hideEllipsoidNoFlyz() {
    this.ellipsoids.show = !this.ellipsoids.show
  }

  public hideSelected() {

    this.global_viewer.selectedEntity.show = !this.global_viewer.selectedEntity.show;
  }

  public resetEntities() {
    var list: any[] = [];
    this.global_viewer.entities.values.forEach((element: any) => {
      if (element.show == false) {
        list.push(element);
        console.log("NOT SHOWING" + element.id)
      }
    });

    if (list.length > 0) {
      list.forEach(element => {
        this.global_viewer.entities.getById(element.id).show = true;
      })

    }
  }

  public deleteNoFlyZone() {

    var zoneName = this.global_viewer.selectedEntity.name;
    var entity = this.global_viewer.selectedEntity.id;
    console.log(entity)
    this.global_viewer.entities.removeById(entity);
    let queryParams = new HttpParams();
    queryParams = queryParams.append("zoneName", zoneName);

    this.httpClient.get<string>('http://34.198.166.4:9093/deleteNoFlyZone', {
      headers: this.httpHeaders,
      params: queryParams
    }).subscribe(response => {
      console.log("Getting RESPONSE " + response);
    })
  }

  public flyToNoFlyZone(zoneName: string) {

    this.global_viewer.entities.values.forEach((element: any) => {
        if(element.name == zoneName) {
          this.global_viewer.zoomTo(element)
        }
    })
    
  }



  private checkInNoFly(longitude: number, latitude: number, altitude: number, flightLabel: string): Observable<getNoFlyZonesConflictResponse> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("longitude", longitude);
    queryParams = queryParams.append("latitude", latitude);
    queryParams = queryParams.append("altitude", altitude);


    return this.httpClient.get<getNoFlyZonesConflictResponse>('http://34.198.166.4:9093/getInNoFlyZone', {
      headers: this.httpHeaders,
      params: queryParams
    }).pipe(tap(response => {
      this.getNoFlyZoneConflictResponse = response;
    })
    );

  }

  private getFlightLocation(longitude: number, latitude: number, flightLabel: string): Observable<GetFlightLocationResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("longitude", longitude);
    queryParams = queryParams.append("latitude", latitude);

    return this.httpClient.get<GetFlightLocationResponse>('http://34.198.166.4:9093/getFlightLocation', {
      headers: this.httpHeaders,
      params: queryParams
    }).pipe(tap(response => {
      console.log("Flight location response recieved" + response.location)
    })
    );
  }

  public async makePlane(view: any, name: string, long: number, lat: number, alt: number) {
    // If plane exists
    if (view.entities.getById(name)) {
      let oldAirplane = view.entities.getById(name);

      // Move plane and change scale
      if (!(long == 0 && lat == 0 && alt == 0)) {
        let newPosition = new Cesium.Cartesian3.fromDegrees(long, lat, alt);



        let direction = Cesium.Cartesian3.subtract(newPosition, oldAirplane._position._value, new Cesium.Cartesian3());
        Cesium.Cartesian3.normalize(direction, direction);

        let rotationMatrix = Cesium.Transforms.rotationMatrixFromPositionVelocity(oldAirplane._position._value, direction);

        oldAirplane._position._value = newPosition;

        let newOrientation = new Cesium.Quaternion();
        Cesium.Quaternion.fromRotationMatrix(rotationMatrix, newOrientation);
        oldAirplane.orientation = newOrientation;

      }
      let distance = Cesium.Cartesian3.distance(oldAirplane._position._value, view.camera.position);
      oldAirplane._model._scale._value = distance / (75 + (distance / 10000))

    } else { // If this is a new plane, make it
      view.entities.remove(view.entities.getById(name))
      let newPosition = new Cesium.Cartesian3.fromDegrees(long, lat, alt);
      let distance = Cesium.Cartesian3.distance(newPosition, view.camera.position);

      const pUri = await Cesium.IonResource.fromAssetId(1662340);
      let airplane = {
        id: name,
        name: name,
        position: newPosition,
        model: {
          uri: pUri,

          scale: distance / (75 + (distance / 10000)),
        },

      };
      view.entities.add(airplane);
    }


  }

  public getAndLoadNoFlyZones(): void {
    console.log("Loading No FlyZones")
    
    
    this.httpClient.get<GetNoFlyZonesResponse>('http://34.198.166.4:9093/get-no-fly-zones', this.httpOptions).subscribe(data => {
      this.getNoFlyZoneResponse = data;
      console.log(data)
      console.log(this.getNoFlyZoneResponse.militaryNoFlyZones)
      // console.log("Response:" + this.getNoFlyZoneResponse);

      console.log('ELLIPSOID NO FLY ZONES')
      for (const ellipsoidNoFly of this.getNoFlyZoneResponse.ellipsoidNoFlyZones) {
        var contains: boolean = false;
        this.global_viewer.entities.values.forEach((element: any) => {
          if (element.name == ellipsoidNoFly.name) {
            contains = true;
          }
        });

        if (!contains) {
          this.global_viewer.entities.add({
            parent: this.ellipsoids,
            name: ellipsoidNoFly.name,
            position: Cesium.Cartesian3.fromDegrees(Number(ellipsoidNoFly.longitude), Number(ellipsoidNoFly.latitude), Number(ellipsoidNoFly.altitude)),
            ellipsoid: {
              radii: new Cesium.Cartesian3(ellipsoidNoFly.longRadius, ellipsoidNoFly.latRadius, ellipsoidNoFly.altRadius),
              material: Cesium.Color.RED.withAlpha(0.5),
            }
          });
          //console.log(ellipsoidNoFly)
        }
      }

      console.log('RECTANGLE NO FLY ZONE')
      for (const rectangleNoFly of this.getNoFlyZoneResponse.rectangleNoFlyZones) {
        var contains: boolean = false;
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
              rotation: Cesium.Math.toRadians(Number(rectangleNoFly.rotationDegree)), // .toRadians( rotation value )
              extrudedHeight: Number(rectangleNoFly.minAltitude),                  //Minimum Height
              height: Number(rectangleNoFly.maxAltitude),
              material: Cesium.Color.fromRandom({ alpha: 0.5 }),
              coordinates: Cesium.Rectangle.fromDegrees(Number(rectangleNoFly.westLongDegree), Number(rectangleNoFly.southLatDegree), Number(rectangleNoFly.eastLongDegree), Number(rectangleNoFly.northLatDegree)),
            },
          });
          // console.log(rectangleNoFly)
        }
      }

      console.log('POLYGON NO FLY ZONE')
      for (const polygonNoFly of this.getNoFlyZoneResponse.polygonNoFlyZones) {
        var contains: boolean = false;
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
                  polygonNoFly.vertex1Long, polygonNoFly.vertex1Lat, polygonNoFly.maxAltitude, polygonNoFly.vertex2Long, polygonNoFly.vertex2Lat, polygonNoFly.maxAltitude, polygonNoFly.vertex3Long, polygonNoFly.vertex3Lat, polygonNoFly.maxAltitude, polygonNoFly.vertex4Long, polygonNoFly.vertex4Lat, polygonNoFly.maxAltitude,
                ]),
                //shapeValues: Array ordered: vertex 1 Longitude, vertex 1 Latitude, max height, vertex 2 Longitude, vertex 2 Latitude, max height, ...
              },
              extrudedHeight: polygonNoFly.minAltitude, //int minimum height
              perPositionHeight: true,
              material: Cesium.Color.RED.withAlpha(0.5),

            },
          });
          // console.log(polygonNoFly)
        }
      }
      // Sandcastle.addToolbarButton("Toggle Ellipsoids", () => {
      //   this.ellipsoids.show = !this.ellipsoids.show
      // })
      console.log('MILITARY BASE NO FLY ZONE')
      console.log(this.getNoFlyZoneResponse)
      for (const militaryBase of this.getNoFlyZoneResponse.militaryNoFlyZones) {
        console.log('JSON DATA')
        let data = JSON.parse(militaryBase.geoJson);
        console.log(data)

        let coords = data.coordinates.toString();
        let coordArray = coords.split(',');

        for(let i = 0; i < coordArray.length; i++){
          coordArray[i] = parseFloat(coordArray[i])
        }

        console.log(coordArray)
  
        this.global_viewer.entities.add({
          name: militaryBase.name, //String Name
          polygon: {
            hierarchy: {
              positions: Cesium.Cartesian3.fromDegreesArray(
                coordArray
              ),
                        //shapeValues: Array ordered: vertex 1 Longitude, vertex 1 Latitude, max height, vertex 2 Longitude, vertex 2 Latitude, max height, ...
            },
            extrudedHeight: 30000,//int minimum height
            perPositionHeight: true,
            material: Cesium.Color.RED.withAlpha(0.5),
  
          },
        });  
      }
      
    })
  }


  flyToAndPlotPoint(longitude: number, latitude: number, altitude: number, flightLabel: string, flightDetails: any) {
    console.log("Inside Fly to and Plot Point" + flightDetails.flight)
    let conflictResponse: string = "";
    if (!this.global_coord_map.has(flightLabel)) {
      this.global_coord_map.set(flightLabel, []);
    }
    if (!this.pointsMap.has(flightLabel)) {
      this.pointsMap.set(flightLabel, []);
    }


    let current_coord_arr: number[] | undefined = this.global_coord_map.get(flightLabel);
    let prev_entity_point: any[] | undefined = this.pointsMap.get(flightLabel);
    let prevVals: number[] | undefined;
    let prevLong: number = 0;
    let prevLat: number = 0;
    let prevAlt: number = 0;
    let location_has_changed: boolean = true;

    if (current_coord_arr != undefined && current_coord_arr?.length > 0) {
      prevVals = current_coord_arr?.slice(Math.max(current_coord_arr.length - 3, 0));
      console.log("sliced array: " + prevVals);

      if (prevVals.length == 3) {
        prevLong = prevVals[0];
        prevLat = prevVals[1];
        prevAlt = prevVals[2];
        location_has_changed = longitude != prevLong || latitude != prevLat || altitude != prevAlt;
        console.log("location_has_changed: " + location_has_changed)
      }
    }



    if (location_has_changed) {
      if (current_coord_arr != undefined) {
        current_coord_arr.push(longitude);
        current_coord_arr.push(latitude);
        current_coord_arr.push(altitude);
      }


    }

    console.log("Coordinate Objects");
    console.log(this.global_coord_map);
    console.log(current_coord_arr);

    // Adding a point to mark location
    // If conflict response string is not empty add warning description to object 
    var splitStr = flightLabel.split("-");

    var point = this.global_viewer.entities.add({
      name: "Flight ICAO: " + splitStr[1],
      position: Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude),
      point: {
        color: Cesium.Color.GREEN,
        pixelSize: 16,
      },


    });

    if (!this.global_viewer.entities.getById("Flight ICAO: " + splitStr[1])) {
      this.global_viewer.camera.moveEnd.addEventListener(() => this.makePlane(this.global_viewer, "Flight ICAO: " + splitStr[1], 0, 0, 0));
    }
    if (location_has_changed) {
      this.makePlane(this.global_viewer, "Flight ICAO: " + splitStr[1], longitude, latitude, altitude);
    }
    if (prev_entity_point != undefined && prev_entity_point?.length > 0) {
      this.global_viewer.entities.remove(prev_entity_point.pop())
    }

    if (prev_entity_point != undefined && prev_entity_point.length <= 0) {
      prev_entity_point.push(point);
    }


    // Making a line with the stored coordinates
    if (location_has_changed) {
      this.global_viewer.entities.add({
        parent: point,
        name: flightLabel,
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArrayHeights(current_coord_arr),
          width: 10,
          material: Cesium.Color.PURPLE,
          clampToGround: false,
        },
      });
    }

    this.getFlightLocation(longitude, latitude, flightLabel).subscribe(response => {

      this.checkInNoFly(longitude, latitude, altitude, flightLabel).subscribe(
        data => {
          console.log("CONFILCIT RESPONSE STRING: " + conflictResponse);
          if (data.inConflict) {
            point.description = '<p> Flight ICAO: ' + splitStr[1] + ' is in no fly zone: ' + data.noFlyZoneName + '<br>\
            For Airline: ' + splitStr[0] + '</p><br> Flight location is over ' + response.location;
            this.global_viewer.selectedEntity = point;
            point.billboard = {
              image: "/assets/images/WarningLabel.png",
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, 25),
              width: 57,
              height: 15,
            };
          } else {
            point.description = '<p> Flight ICAO: ' + splitStr[1] + ' is over ' + response.location;
          }
        }
      )
    })
  }

  plotFlightRouteFull(departLong: number, departLat: number, arrLong: number, arrLat: number ) {

  }


}


