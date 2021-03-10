import { TestBed } from '@angular/core/testing';

import { UserRegistrationGuard } from './user-registration.guard';

describe('UserRegistrationGuard', () => {
  let guard: UserRegistrationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserRegistrationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
