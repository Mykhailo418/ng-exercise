import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

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
export class UsersListComponent implements OnInit {
  private page = 1;
  usersList$: Observable<UserExtended[]>

  constructor(private usersService: UsersService,
              private usersStorageService: UsersStorageService) { }

  ngOnInit(): void {
    this.usersList$ = this.usersStorageService.observeUsersList();

    this.usersService.getUsersList(this.page)
      .subscribe((usersList: UserExtended[]) => {
        this.usersStorageService.setUsersList(usersList);
      });
  }

}
