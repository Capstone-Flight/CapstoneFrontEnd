import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTrackingPageComponent } from './flight-tracking-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('FlightTrackingPageComponent', () => {
  let component: FlightTrackingPageComponent;
  let fixture: ComponentFixture<FlightTrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightTrackingPageComponent ],
      imports:  [HttpClientModule, AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
