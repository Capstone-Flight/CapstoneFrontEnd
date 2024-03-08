import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumComponentComponent } from './cesium-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';

describe('CesiumComponentComponent', () => {
  let component: CesiumComponentComponent;
  let fixture: ComponentFixture<CesiumComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppModule],
      declarations: [ CesiumComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CesiumComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
