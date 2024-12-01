import { TestBed } from '@angular/core/testing';

import { ParticipacionService } from './participacion.service';

describe('ParticipacionService', () => {
  let service: ParticipacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
