import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superauthGuard } from './superauth.guard';

describe('superauthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superauthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
