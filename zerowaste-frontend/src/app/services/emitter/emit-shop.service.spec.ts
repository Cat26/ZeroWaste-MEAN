import { TestBed } from '@angular/core/testing';

import { EmitShopService } from './emit-shop.service';

describe('EmitShopService', () => {
  let service: EmitShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmitShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
