import { TestBed } from '@angular/core/testing';

import { EmitEventService } from './emit-event.service';

describe('EmitEventService', () => {
  let service: EmitEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
