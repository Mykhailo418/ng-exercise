import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UsersListComponent } from './users-list.component';

// services
import { UsersService } from '../../services/users.service';
import { UsersStorageService } from '../../services/users-storage.service';

class MockUsersService {
  getUsersList() {
    return of([]);
  }
}

class MockUsersStorageService {
  observeUsersList() {
    return of([])
  }
  setUsersList() {
  }
}

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListComponent ],
      providers: [
        {provide: UsersService, useClass: MockUsersService},
        {provide: UsersStorageService, useClass: MockUsersStorageService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user list on init', (done) => {
    component.usersList$.subscribe(usersList => {
      expect(usersList).toEqual([]);
      done();
    });
  })
});
