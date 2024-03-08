import { EllipsoidNoFly } from "../ellipsoid-no-fly/ellipsoid-no-fly";
import { PolygonNoFly } from "../polygon-no-fly/polygon-no-fly";
import { RectangleNoFly } from "../rectangle-no-fly/rectangle-no-fly";
import { MilitaryBase } from '../military-base/military-base';
import { TfrNoFly } from "../tfr-no-fly/tfr-no-fly";

export class GetNoFlyZonesResponse {

    private _ellipsoidNoFlyZones: EllipsoidNoFly[];
    private _rectangleNoFlyZones: RectangleNoFly[];
    private _polygonNoFlyZones: PolygonNoFly[];
    private _militaryNoFlyZones: MilitaryBase[];
    private _tfrNoFlyZones: TfrNoFly[];

    public get militaryNoFlyZones(): MilitaryBase[] {
        return this._militaryNoFlyZones;
    }

    public set militaryNoFlyZones(value: MilitaryBase[]) {
        this._militaryNoFlyZones = value;
    }


    public get ellipsoidNoFlyZones(): EllipsoidNoFly[] {
        return this._ellipsoidNoFlyZones;
    }

    public set ellipsoidNoFlyZones(value: EllipsoidNoFly[]) {
        this._ellipsoidNoFlyZones = value;
    }

    public get polygonNoFlyZones(): PolygonNoFly[] {
        return this._polygonNoFlyZones;
    }

    public set polygonNoFlyZones(value: PolygonNoFly[]) {
        this._polygonNoFlyZones = value;
    }

    public get rectangleNoFlyZones(): RectangleNoFly[] {
        return this._rectangleNoFlyZones;
    }

    public set rectangleNoFlyZones(value: RectangleNoFly[]) {
        this._rectangleNoFlyZones = value;
    }

    public get tfrNoFlyZones(): TfrNoFly[] {
        return this._tfrNoFlyZones;
    }

    public set tfrNoFlyZones(value: TfrNoFly[]) {
        this._tfrNoFlyZones = value;
    }
}
