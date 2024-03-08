import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPolygonNoFlyZoneComponent } from './custom-polygon-no-fly-zone.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';

describe('CustomPolygonNoFlyZoneComponent', () => {
  let component: CustomPolygonNoFlyZoneComponent;
  let fixture: ComponentFixture<CustomPolygonNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomPolygonNoFlyZoneComponent],
      imports: [AppModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomPolygonNoFlyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the object name when the name is changed in the form', () => {
    component.name = "Example"
    let event = new Event('change');
    component.changeName(event);
    expect(component.name).toEqual(component.polygonNoFly.name);
  });

  it('should change the object name when vertex1Long is changed in the form', () => {
    component.vertex1Long = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex1Long(event);
    expect(component.vertex1Long).toEqual(component.polygonNoFly.vertex1Long);
  });

  it('should change the object name when vertex1Lat is changed in the form', () => {
    component.vertex1Lat = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex1Lat(event);
    expect(component.vertex1Lat).toEqual(component.polygonNoFly.vertex1Lat);
  });

  it('should change the object name when vertex2Long is changed in the form', () => {
    component.vertex2Long = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex2Long(event);
    expect(component.vertex2Long).toEqual(component.polygonNoFly.vertex2Long);
  });

  it('should change the object name when vertex2Lat is changed in the form', () => {
    component.vertex2Lat = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex2Lat(event);
    expect(component.vertex2Lat).toEqual(component.polygonNoFly.vertex2Lat);
  });

  it('should change the object name when vertex3Long is changed in the form', () => {
    component.vertex3Long = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex3Long(event);
    expect(component.vertex3Long).toEqual(component.polygonNoFly.vertex3Long);
  });

  it('should change the object name when vertex3Lat is changed in the form', () => {
    component.vertex3Lat = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex3Lat(event);
    expect(component.vertex3Lat).toEqual(component.polygonNoFly.vertex3Lat);
  });

  it('should change the object name when vertex4Long is changed in the form', () => {
    component.vertex4Long = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex4Long(event);
    expect(component.vertex4Long).toEqual(component.polygonNoFly.vertex4Long);
  });

  it('should change the object name when vertex4Lat is changed in the form', () => {
    component.vertex4Lat = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeVertex4Lat(event);
    expect(component.vertex4Lat).toEqual(component.polygonNoFly.vertex4Lat);
  });

  it('should change the object name when minAltitude is changed in the form', () => {
    component.minAltitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeMinAltitude(event);
    expect(component.minAltitude).toEqual(component.polygonNoFly.minAltitude);
  });

  it('should change the object name when maxAltitude is changed in the form', () => {
    component.maxAltitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeMaxAltitude(event);
    expect(component.maxAltitude).toEqual(component.polygonNoFly.maxAltitude);
  });

  it('should return true if no fly zone object is incomplete', () => {
    expect(component.checkForCompleteNoFlyZoneObject()).toBe(true);
  });

  it('should return false if no fly zone object is complete', () => {
    component.name = "Example";
    component.vertex1Long = Math.floor(Math.random() * 1234);
    component.vertex1Lat = Math.floor(Math.random() * 1234);
    component.vertex2Long = Math.floor(Math.random() * 1234);
    component.vertex2Lat = Math.floor(Math.random() * 1234);
    component.vertex3Long = Math.floor(Math.random() * 1234);
    component.vertex3Lat = Math.floor(Math.random() * 1234);
    component.vertex4Long = Math.floor(Math.random() * 1234);
    component.vertex4Lat = Math.floor(Math.random() * 1234);
    component.minAltitude = Math.floor(Math.random() * 1234);
    component.maxAltitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeName(event);
    component.changeVertex1Long(event);
    component.changeVertex1Lat(event);
    component.changeVertex2Long(event);
    component.changeVertex2Lat(event);
    component.changeVertex3Long(event);
    component.changeVertex3Lat(event);
    component.changeVertex4Long(event);
    component.changeVertex4Lat(event);
    component.changeMinAltitude(event);
    component.changeMaxAltitude(event);
    expect(component.checkForCompleteNoFlyZoneObject()).toBe(false);
  });
});
