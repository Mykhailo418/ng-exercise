import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// services
import { UsersService } from './users.service';

// models
import {
  UsersListResponse,
  UserExtended,
  UserFromReqres,
  UserDetailResponse
} from '../models/users.model'

const mockUser = <UserFromReqres>{
  "id": 6,
  "email": "tracey.ramos@reqres.in",
  "first_name": "Tracey",
  "last_name": "Ramos",
  "avatar": "avatar"
};

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(UsersService);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users list via url', () => {
    const page = 1;
    const mockUsersListResponse = <UsersListResponse>{data: [mockUser]};

    service.getUsersList(page)
      .subscribe((users: UserExtended[]) => {
        expect(users[0]).toEqual({
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.first_name,
          lastName: mockUser.last_name,
          avatar: mockUser.avatar,
        });
      });

    const req = httpTestingController.expectOne('https://reqres.in/api/users?page=1&per_page=12');

    expect(req.request.method).toEqual('GET');

    req.flush(mockUsersListResponse);
  });

  it('should get user by id via url', () => {
    const id = 6;
    const mockUserDetailResponse = <UserDetailResponse>{data: mockUser};

    service.getUserById(id)
      .subscribe((user: UserExtended) => {
        expect(user).toEqual({
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.first_name,
          lastName: mockUser.last_name,
          avatar: mockUser.avatar,
        });
      });

    const req = httpTestingController.expectOne(`https://reqres.in/api/users/${id}`);

    expect(req.request.method).toEqual('GET');

    req.flush(mockUserDetailResponse);
  });
});
