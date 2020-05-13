import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

// services
import { UsersService } from '../../services/users.service';
import { UsersStorageService } from '../../services/users-storage.service';

// models
import { UserExtended } from '../../models/users.model';

@Component({
  selector: 'ng-e-app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  usersList$: Observable<UserExtended[]>

  private ngUnsubscribe = new Subject();

  constructor(private usersService: UsersService,
              private usersStorageService: UsersStorageService) { }

  ngOnInit(): void {
    this.usersList$ = this.usersStorageService.observeUsersList()
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe)
      );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
