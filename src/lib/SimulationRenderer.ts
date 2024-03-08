import { Plane } from "cesium";
import { NoFlyZone } from "./simulation-entities/no-fly-zone";

export interface SimulationRenderer {
  CreatePlane(): Plane;
  CreateNoFlyZone(): NoFlyZone;

  RemovePlane(plane: Plane): void;
  RemoveNoFlyZone(zone: NoFlyZone): void;

  UpdatePlaneInformation(plane: Plane): void;
}

export interface SimulationViewer {
  handleNoFlyZoneCreation(zone: NoFlyZone): void;
}
