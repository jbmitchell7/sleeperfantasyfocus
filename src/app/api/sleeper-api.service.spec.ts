import { TestBed } from '@angular/core/testing';

import { SleeperApiService } from './sleeper-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SleeperApiService', () => {
  let service: SleeperApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(), provideHttpClientTesting()]
});
    service = TestBed.inject(SleeperApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
