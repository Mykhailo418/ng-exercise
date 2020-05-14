import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

// models
import { User } from '../models/user.model';

const mockUser: User = {
  firstName: 'Ahsan',
  lastName: 'Ayaz'
};
const mockUserId = '_USER_ID';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user data as observable', (done) => {
      service.observeLoggedInState()
        .subscribe((isLoggedIn: boolean) => {
          expect(isLoggedIn).toBeFalsy();
          done();
        });
  });

  it('should login and save user data', (done) => {
    service.login();
    const userData = service.getUserData();
    expect(userData).toEqual(mockUser);
    service.observeLoggedInState()
      .subscribe((isLoggedIn: boolean) => {
        expect(isLoggedIn).toBeTruthy();
        done();
      });
  });

  it('should logout after login and remove user data', (done) => {
    service.login();
    service.logout();
    const userDataSerialized = localStorage.getItem(mockUserId);
    expect(userDataSerialized).toBe(null);
    service.observeLoggedInState()
      .subscribe((isLoggedIn: boolean) => {
        expect(isLoggedIn).toBeFalsy();
        done();
      });
  });

});
