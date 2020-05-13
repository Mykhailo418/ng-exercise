import { TestBed } from '@angular/core/testing';

import { UsersStorageService } from './users-storage.service';

// models
import {  UserExtended } from '../models/users.model';

describe('UsersStorageService', () => {
  let service: UsersStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users lists as observable', (done) => {
      service.observeUsersList()
        .subscribe(usersList => {
          expect(usersList).toBe(null);
          done();
        });
  });

  it('should set users list', (done) => {
    const mockUser = <UserExtended>{
      id: 1,
      firstName: 'test'
    };
    const mockUserList = [mockUser];
    const usersList$ = service.observeUsersList();
    service.setUsersList(mockUserList);
    usersList$
      .subscribe(usersList => {
        expect(usersList).toEqual(mockUserList);
        done();
      });
  });
});
