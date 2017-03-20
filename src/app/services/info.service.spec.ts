import { TestBed, inject } from '@angular/core/testing';

import { InfoService } from './info.service';

describe('InfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoService]
    });
  });

  it('should ...', inject([InfoService], (service: InfoService) => {
    expect(service).toBeTruthy();
  }));
});
