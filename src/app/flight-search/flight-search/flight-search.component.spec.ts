import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchComponent } from './flight-search.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightSearchComponent],
      imports: [HttpClientModule, AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
