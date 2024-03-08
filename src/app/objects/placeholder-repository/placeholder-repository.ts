import { EllipsoidNoFly } from "../ellipsoid-no-fly/ellipsoid-no-fly";
import { PolygonNoFly } from "../polygon-no-fly/polygon-no-fly";
import { RectangleNoFly } from "../rectangle-no-fly/rectangle-no-fly";
import { MilitaryBase } from '../military-base/military-base';
import { GetNoFlyZonesResponse } from '../get-no-fly-zones-response/get-no-fly-zones-response';


export class PlaceholderRepository {

    private _getNoFlyZonesResponse: GetNoFlyZonesResponse = new GetNoFlyZonesResponse();

    public get getNoFlyZonesResponse(): GetNoFlyZonesResponse {
        return this._getNoFlyZonesResponse;
    }

    public set getNoFlyZonesResponse(value: GetNoFlyZonesResponse) {
        this._getNoFlyZonesResponse = value;
    }

    public setUpRepository() {
      this._getNoFlyZonesResponse.ellipsoidNoFlyZones = [];
        this._getNoFlyZonesResponse.rectangleNoFlyZones = [];
        this._getNoFlyZonesResponse.polygonNoFlyZones = [];
        this._getNoFlyZonesResponse.militaryNoFlyZones = [];
        this._getNoFlyZonesResponse.tfrNoFlyZones = [];

        //Everything below can be deleted at a later date

        let testEllipsoid = new EllipsoidNoFly();
        testEllipsoid.name = "Test Ellipsoid";
        testEllipsoid.latitude = 41;
        testEllipsoid.longitude = -99;
        testEllipsoid.altitude = 5000;
        testEllipsoid.latRadius = 1000000;
        testEllipsoid.longRadius = 1000000;
        testEllipsoid.altRadius = 10000;

        let testRectangle = new RectangleNoFly();
        testRectangle.name = "Test Rectangle";
        testRectangle.northLatDegree = 50;
        testRectangle.southLatDegree = 30;
        testRectangle.westLongDegree = -50;
        testRectangle.eastLongDegree = -30;
        testRectangle.minAltitude = 0;
        testRectangle.maxAltitude = 10000;
        testRectangle.rotationDegree = 0;

        let testPolygon = new PolygonNoFly();
        testPolygon.name = "Test Polygon";
        testPolygon.vertex1Lat = -20;
        testPolygon.vertex1Long = -50;
        testPolygon.vertex2Lat = -20;
        testPolygon.vertex2Long = -30;
        testPolygon.vertex3Lat = 0;
        testPolygon.vertex3Long = -30;
        testPolygon.vertex4Lat = -10;
        testPolygon.vertex4Long = -60;
        testPolygon.minAltitude = 0;
        testPolygon.maxAltitude = 10000;

        let testMilitaryBase = new MilitaryBase();
        testMilitaryBase.name = "Test Military Base";
        testMilitaryBase.geoJson = "";

        this._getNoFlyZonesResponse.ellipsoidNoFlyZones = [testEllipsoid];
        this._getNoFlyZonesResponse.rectangleNoFlyZones = [testRectangle];
        this._getNoFlyZonesResponse.polygonNoFlyZones = [testPolygon];
        this._getNoFlyZonesResponse.militaryNoFlyZones = [];
        this._getNoFlyZonesResponse.tfrNoFlyZones = [];

        this.checkInterval();
    }

    public checkInterval() {
        console.log("We out here.");
        setInterval(this.checkInterval, 10000);
    }

    public deleteNoFlyZone(zoneName: string) {
        for (let i = 0; i < this._getNoFlyZonesResponse.ellipsoidNoFlyZones.length; i++) {
            if (this._getNoFlyZonesResponse.ellipsoidNoFlyZones[i].name == zoneName) {
                this._getNoFlyZonesResponse.ellipsoidNoFlyZones.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < this._getNoFlyZonesResponse.rectangleNoFlyZones.length; i++) {
            if (this._getNoFlyZonesResponse.rectangleNoFlyZones[i].name == zoneName) {
                this._getNoFlyZonesResponse.rectangleNoFlyZones.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < this._getNoFlyZonesResponse.polygonNoFlyZones.length; i++) {
            if (this._getNoFlyZonesResponse.polygonNoFlyZones[i].name == zoneName) {
                this._getNoFlyZonesResponse.polygonNoFlyZones.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < this._getNoFlyZonesResponse.militaryNoFlyZones.length; i++) {
            if (this._getNoFlyZonesResponse.militaryNoFlyZones[i].name == zoneName) {
                this._getNoFlyZonesResponse.militaryNoFlyZones.splice(i, 1);
                break;
            }
        }
    }

    public addEllipsoidNoFlyZone(ellipsoidIn: EllipsoidNoFly) {
        this._getNoFlyZonesResponse.ellipsoidNoFlyZones.push(ellipsoidIn); 
    }

    public addRectangleNoFlyZone(rectangleIn: RectangleNoFly) {
        this._getNoFlyZonesResponse.rectangleNoFlyZones.push(rectangleIn);
    }

    public addPolygonNoFlyZone(polygonIn: PolygonNoFly) {
        this._getNoFlyZonesResponse.polygonNoFlyZones.push(polygonIn);
    }
}
