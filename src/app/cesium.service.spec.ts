import { TestBed } from '@angular/core/testing';

import { CesiumService } from './cesium.service';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from './app.module';

describe('CesiumService', () => {
  let service: CesiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(CesiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
