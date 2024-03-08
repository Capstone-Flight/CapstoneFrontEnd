import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CesiumService } from '../cesium.service';
import { SocketService } from '../socket.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { SimulationRenderer } from 'src/lib/SimulationRenderer';
import { Plane } from 'cesium';
import { NoFlyZone } from 'src/lib/simulation-entities/no-fly-zone';


@Component({
  selector: 'app-cesium-component',
  templateUrl: './cesium-component.component.html',
  styleUrls: ['./cesium-component.component.css']
})
export class CesiumComponentComponent implements OnInit, SimulationRenderer{
  id!: string | null;
  zoneName: string;
  flightIcao: string;


  constructor(
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.socket.connectToConsumer();
  }

  CreatePlane(): Plane {
    throw new Error('Method not implemented.');
  }

  CreateNoFlyZone(): NoFlyZone {
    throw new Error('Method not implemented.');
  }

  RemovePlane(plane: Plane): void {
    throw new Error('Method not implemented.');
  }

  RemoveNoFlyZone(zone: NoFlyZone): void {
    throw new Error('Method not implemented.');
  }

  UpdatePlaneInformation(plane: Plane): void {
    throw new Error('Method not implemented.');
  }
}
