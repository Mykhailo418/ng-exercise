import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// models
import {
  UsersListResponse,
  UserExtended,
  UserFromReqres,
  UserDetailResponse
} from '../models/users.model';

@Injectable()
export class UsersService {
  private BASE_URL = 'https://reqres.in/api/users'
  private USERS_PER_PAGE = 12;

  constructor(private http: HttpClient) { }

  getUsersList = (page: number): Observable<UserExtended[]> => {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', this.USERS_PER_PAGE.toString());

    return this.http.get<UsersListResponse>(this.BASE_URL, {params})
      .pipe(
        map((response: UsersListResponse) => response.data.map(this.convertUserFromReqresToUser)),
        catchError(() => of([]))
      );
  }

  getUserById = (id: number): Observable<UserExtended> =>
    this.http.get<UserDetailResponse>(`${this.BASE_URL}/${id}`)
      .pipe(
        map((response: UserDetailResponse) => this.convertUserFromReqresToUser(response.data)),
        catchError(() => of(null))
      );

  private convertUserFromReqresToUser(user: UserFromReqres): UserExtended {
    return  {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      firstName: user.first_name,
      lastName: user.last_name,
    }
  }
}
