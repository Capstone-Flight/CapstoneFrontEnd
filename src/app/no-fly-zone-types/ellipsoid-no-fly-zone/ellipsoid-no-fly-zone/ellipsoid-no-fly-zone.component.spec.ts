import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipsoidNoFlyZoneComponent } from './ellipsoid-no-fly-zone.component';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EllipsoidNoFlyZoneComponent', () => {
  let component: EllipsoidNoFlyZoneComponent;
  let fixture: ComponentFixture<EllipsoidNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EllipsoidNoFlyZoneComponent ],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(EllipsoidNoFlyZoneComponent);
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
    expect(component.name).toEqual(component.ellipsoidNoFly.name);
  });

  it('should change the object longitude when longitude is changed in the form', () => {
    component.longitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeLongitude(event);
    expect(component.longitude).toEqual(component.ellipsoidNoFly.longitude);
  });

  it('should change the object latitude when latitude is changed in the form', () => {
    component.latitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeLatitude(event);
    expect(component.latitude).toEqual(component.ellipsoidNoFly.latitude);
  });

  it('should change the object altitude when altitude is changed in the form', () => {
    component.altitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeAltitude(event);
    expect(component.altitude).toEqual(component.ellipsoidNoFly.altitude);
  });

  it('should change the object longitude radius when longitude radus is changed in the form', () => {
    component.longitudeRadius = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeLongRadius(event);
    expect(component.longitudeRadius).toEqual(component.ellipsoidNoFly.longRadius);
  });

  it('should change the object latitude radius when latitude radius is changed in the form', () => {
    component.latitudeRadius = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeLatRadius(event);
    expect(component.latitudeRadius).toEqual(component.ellipsoidNoFly.latRadius);
  });

  it('should change the object altitude radius when altitude radius is changed in the form', () => {
    component.altRadius = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeAltRadius(event);
    expect(component.altRadius).toEqual(component.ellipsoidNoFly.altRadius);
  });

  it('should return true if no fly zone object is incomplete', () => {
    expect(component.checkForCompleteNoFlyZoneObject()).toBe(true);
  });

  it('should return false if no fly zone object is complete', () => {
    component.name = "Example";
    component.latitude = Math.floor(Math.random() * 1234);
    component.longitude = Math.floor(Math.random() * 1234);
    component.altitude = Math.floor(Math.random() * 1234);
    component.latitudeRadius = Math.floor(Math.random() * 1234);
    component.longitudeRadius = Math.floor(Math.random() * 1234);
    component.altRadius = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeName(event);
    component.changeLatitude(event);
    component.changeLongitude(event);
    component.changeAltitude(event);
    component.changeLatRadius(event);
    component.changeLongRadius(event);
    component.changeAltRadius(event);
    expect(component.checkForCompleteNoFlyZoneObject()).toBe(false);
  });
});
