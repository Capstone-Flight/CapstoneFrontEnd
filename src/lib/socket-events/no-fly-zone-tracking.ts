import { GeographicCoordinates2D } from '../simulation-entities/coordinattes';

type NoFlyZoneType = 'POLYGON' | 'CIRCLE';

type BaseNoFlyZone = {
  id: string;
  altitude: number;
  createdAt: string;
  notamNumber: string;
  type: NoFlyZoneType;
};

export type PolygonNoFlyZone = BaseNoFlyZone & {
  type: 'POLYGON';
  vertices: GeographicCoordinates2D[];
};

export type CircularNoFlyZone = BaseNoFlyZone & {
  type: 'CIRCLE';
  radius: number;
  center: GeographicCoordinates2D;
};

export type NoFlyZoneInfo = PolygonNoFlyZone | CircularNoFlyZone;

export type NoFlyZoneCreatedMessage = {
  type: NoFlyZoneType;
  noFlyZoneId: string;
  noFlyZoneMessage: string;
  noFlyZone: NoFlyZoneInfo;
};
