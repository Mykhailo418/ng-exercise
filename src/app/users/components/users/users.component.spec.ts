import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UsersComponent } from './users.component';

// services
import { UsersService } from '../../services/users.service';
import { UsersStorageService } from '../../services/users-storage.service';

class MockUsersService {
  getUsersList() {
    return of([]);
  }
}

class MockUsersStorageService {
  setUsersList() {}
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers: [
        {provide: UsersService, useClass: MockUsersService},
        {provide: UsersStorageService, useClass: MockUsersStorageService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
