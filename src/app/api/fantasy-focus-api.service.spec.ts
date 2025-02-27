import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FantasyFocusApiService } from './fantasy-focus-api.service';
import { provideHttpClient } from '@angular/common/http';

describe('FantasyFocusApiService', () => {
  let service: FantasyFocusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(), provideHttpClientTesting()]
});
    service = TestBed.inject(FantasyFocusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
