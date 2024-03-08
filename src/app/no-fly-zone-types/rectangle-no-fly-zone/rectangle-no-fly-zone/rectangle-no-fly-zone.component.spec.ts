import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleNoFlyZoneComponent } from './rectangle-no-fly-zone.component';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('RectangleNoFlyZoneComponent', () => {
  let component: RectangleNoFlyZoneComponent;
  let fixture: ComponentFixture<RectangleNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RectangleNoFlyZoneComponent ],
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

    fixture = TestBed.createComponent(RectangleNoFlyZoneComponent);
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
    expect(component.name).toEqual(component.rectangleNoFly.name);
  });

  it('should change the object west longitude when west longitude is changed in the form', () => {
    component.westLongDegree = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeWestLongDegree(event);
    expect(component.westLongDegree).toEqual(component.rectangleNoFly.westLongDegree);
  });

  it('should change the object east longitude when east longitude is changed in the form', () => {
    component.eastLongDegree = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeEastLongDegree(event);
    expect(component.eastLongDegree).toEqual(component.rectangleNoFly.eastLongDegree);
  });

  it('should change the object south latitude when south latitude is changed in the form', () => {
    component.southLatDegree = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeSouthLatDegree(event);
    expect(component.southLatDegree).toEqual(component.rectangleNoFly.southLatDegree);
  });

  it('should change the object north latitude when north latitude is changed in the form', () => {
    component.northLatDegree = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeNorthLatDegree(event);
    expect(component.northLatDegree).toEqual(component.rectangleNoFly.northLatDegree);
  });

  it('should change the object rotation degree when rotation degree is changed in the form', () => {
    component.rotationDegree = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeRotationDegree(event);
    expect(component.rotationDegree).toEqual(component.rectangleNoFly.rotationDegree);
  });

  it('should change the object name when minAltitude is changed in the form', () => {
    component.minAltitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeMinAltitude(event);
    expect(component.minAltitude).toEqual(component.rectangleNoFly.minAltitude);
  });

  it('should change the object name when maxAltitude is changed in the form', () => {
    component.maxAltitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeMaxAltitude(event);
    expect(component.maxAltitude).toEqual(component.rectangleNoFly.maxAltitude);
  });

  it('should return true if no fly zone object is incomplete', () => {
    expect(component.checkForCompleteNoFlyZoneObject()).toBe(true);
  });

  it('should return false if no fly zone object is complete', () => {
    component.name = "Example";
    component.eastLongDegree = Math.floor(Math.random() * 1234);
    component.westLongDegree = Math.floor(Math.random() * 1234);
    component.southLatDegree = Math.floor(Math.random() * 1234);
    component.northLatDegree = Math.floor(Math.random() * 1234);
    component.rotationDegree = Math.floor(Math.random() * 1234);
    component.minAltitude = Math.floor(Math.random() * 1234);
    component.maxAltitude = Math.floor(Math.random() * 1234);
    let event = new Event('change');
    component.changeName(event);
    component.changeEastLongDegree(event);
    component.changeWestLongDegree(event);
    component.changeSouthLatDegree(event);
    component.changeNorthLatDegree(event);
    component.changeRotationDegree(event);
    component.changeMinAltitude(event);
    component.changeMaxAltitude(event);
    expect(component.checkForCompleteNoFlyZoneObject()).toBe(false);
  });
});
