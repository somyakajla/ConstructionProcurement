import { TestBed } from '@angular/core/testing';

import { AcceptBidService } from './accept-bid.service';

describe('AcceptBidService', () => {
  let service: AcceptBidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptBidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
