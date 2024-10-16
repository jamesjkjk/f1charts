/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarDataService } from './carData.service';

describe('Service: CarData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarDataService]
    });
  });

  it('should ...', inject([CarDataService], (service: CarDataService) => {
    expect(service).toBeTruthy();
  }));
});
