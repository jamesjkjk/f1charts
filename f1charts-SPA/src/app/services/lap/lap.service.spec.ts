/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LapService } from './lap.service';

describe('Service: Lap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LapService]
    });
  });

  it('should ...', inject([LapService], (service: LapService) => {
    expect(service).toBeTruthy();
  }));
});
