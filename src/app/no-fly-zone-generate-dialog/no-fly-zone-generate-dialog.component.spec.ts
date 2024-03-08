import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFlyZoneGenerateDialog as NoFlyZoneGenerateDialog } from './no-fly-zone-generate-dialog.component';
import { AppModule } from '../app.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('NoFlyZoneGenerateDialogComponent', () => {
  let component: NoFlyZoneGenerateDialog;
  let fixture: ComponentFixture<NoFlyZoneGenerateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoFlyZoneGenerateDialog],
      imports: [AppModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
     ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoFlyZoneGenerateDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
