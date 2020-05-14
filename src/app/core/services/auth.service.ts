import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// models
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_ID = '_USER_ID';
  private user: User = {
    firstName: 'Ahsan',
    lastName: 'Ayaz'
  };
  private isLoggedIn$ = new BehaviorSubject(false);

  constructor() { }

  observeLoggedInState(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  login(): void {
    localStorage.setItem(this.USER_ID, this.serializeUserData(this.user));
    this.isLoggedIn$.next(true);
  }

  logout(): void {
    localStorage.removeItem(this.USER_ID);
    this.isLoggedIn$.next(false);
  }

  getUserData(): User {
    return this.unserializeUserData(localStorage.getItem(this.USER_ID));
  }

  private serializeUserData(data: User): string {
    return JSON.stringify(data);
  }

  private unserializeUserData(data: string): User {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
}
