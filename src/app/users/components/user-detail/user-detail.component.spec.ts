import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of } from 'rxjs';

import { UserDetailComponent } from './user-detail.component';

// services
import { UsersService } from '../../services/users.service';
import { UsersStorageService } from '../../services/users-storage.service';

class MockUsersService {
  getUserById() {
    return of(null);
  }
}

class MockUsersStorageService {
  observeUsersList() {
    return of([])
  }
  getUser() {
    return of(null);
  }
}
const userId = 1;
const mockRoutesParams = {
  params: of({
    id: userId
  })
}

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let usersService: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: UsersService, useClass: MockUsersService},
        {provide: ActivatedRoute, useValue: mockRoutesParams},
        {provide: UsersStorageService, useClass: MockUsersStorageService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
    usersService = TestBed.get(UsersService);
    component = fixture.componentInstance;
    spyOn(usersService, 'getUserById').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user by id on init', () => {
    expect(usersService.getUserById).toHaveBeenCalledWith(userId);
  });

  it('should go back to users list page', () => {
    spyOn(router, 'navigate')

    component.back();

    expect(router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: activatedRoute });
  });
});
