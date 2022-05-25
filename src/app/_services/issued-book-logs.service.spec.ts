import { TestBed } from '@angular/core/testing';

import { IssuedBookLogsService } from './issued-book-logs.service';

describe('IssuedBookLogsService', () => {
  let service: IssuedBookLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuedBookLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
