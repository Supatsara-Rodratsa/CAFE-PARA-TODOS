import { TestBed } from '@angular/core/testing';

import { CoffeeHandlerService } from './coffee-handler.service';

describe('CoffeeHandlerService', () => {
  let service: CoffeeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
