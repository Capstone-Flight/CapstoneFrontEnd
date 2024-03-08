import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoFlyZoneComponent } from './add-no-fly-zone.component';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';

describe('AddNoFlyZoneComponent', () => {
  let component: AddNoFlyZoneComponent;
  let fixture: ComponentFixture<AddNoFlyZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNoFlyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
