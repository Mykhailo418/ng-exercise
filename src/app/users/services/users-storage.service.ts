import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

// models
import { UserExtended } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersStorageService {
  private usersListSubject = new BehaviorSubject(null);
  private usersList: UserExtended[];

  constructor() { }

  observeUsersList(): Observable<UserExtended[]> {
    return this.usersListSubject.asObservable();

  }

  setUsersList(usersList: UserExtended[]): void {
    this.usersList = usersList;
    this.usersListSubject.next(this.usersList);
  }

  getUser(id: number): Observable<UserExtended> {
    return this.observeUsersList()
      .pipe(
        map(users => users && users.find(user => user.id === id)),
      );
  }
}
