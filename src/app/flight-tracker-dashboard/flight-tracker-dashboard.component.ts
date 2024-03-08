import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimulationController } from '../../lib/simulation-controller';
import { Url } from '../../lib/utils/url';
import { CesiumService } from '../cesium.service';
import { HttpClient } from '@angular/common/http';
import { CesiumComponentComponent } from '../cesium-component/cesium-component.component';
import { Observable, map, startWith } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { FlightInformation } from 'src/lib/socket-events/flight-tracking';
import { NoFlyZone } from 'src/lib/simulation-entities/no-fly-zone';
import { DeepReadonly } from 'src/lib/utils/types';
import {
  CircularNoFlyZone,
  NoFlyZoneInfo,
  PolygonNoFlyZone,
} from 'src/lib/socket-events/no-fly-zone-tracking';

@Component({
  selector: 'app-flight-tracker-dashboard',
  templateUrl: './flight-tracker-dashboard.component.html',
  styleUrls: ['./flight-tracker-dashboard.component.css'],
})
export class FlightTrackerDashboardComponent implements OnInit {
  private simulationController: SimulationController;

  public filter = new FormControl('');

  public noFlyZone: DeepReadonly<NoFlyZoneInfo[]> = [];
  public planes: DeepReadonly<FlightInformation[]> = [];

  // public filteredOptions = this.options;

  @ViewChild('simulationRenderer') simulationRenderer: CesiumComponentComponent;

  constructor(private _snackBar: MatSnackBar, private cesium: CesiumService) {}

  ngOnInit() {
    this.simulationController = new SimulationController();
    this.cesium.setUpViewer('cesium');
    this.cesium.getAndLoadNoFlyZones();

    this.configureListener();
  }

  public configureListener(): void {
    this.simulationController.events.noFllyZonesUpdated.addHandler(
      (noFlyZones) => {
        this.noFlyZone = noFlyZones;
      }
    );

    this.simulationController.events.flightCreated.addHandler((flight) => {
      this.planes = flight;
    });

    this.simulationController.events.message.addHandler((message) => {
      this._snackBar.open(message.message, '', {
        duration: 2000,
      });
    });
  }
}
