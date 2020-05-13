import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { UsersListResponse, UserExtended, UserFromReqres } from '../models/users.model';

@Injectable()
export class UsersService {
  private usersPerPage = 12;

  constructor(private http: HttpClient) { }

  getUsersList = (page: number): Observable<UserExtended[]> => {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', this.usersPerPage.toString());

    return this.http.get<UsersListResponse>(`https://reqres.in/api/users`, {params})
      .pipe(
        map((response: UsersListResponse) => response.data.map(this.convertUserFromReqresToUser))
      );
  }

  private convertUserFromReqresToUser(user: UserFromReqres): UserExtended {
    return  {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    }
  }
}
