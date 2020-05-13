import { Component, OnInit } from '@angular/core';

// services
import { UsersService } from '../../services/users.service';
import { UsersStorageService } from '../../services/users-storage.service';

// models
import { UserExtended } from '../../models/users.model';

@Component({
  selector: 'ng-e-app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private page = 1;

  constructor(private usersService: UsersService,
              private usersStorageService: UsersStorageService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.usersService.getUsersList(this.page)
      .subscribe((usersList: UserExtended[]) => {
        this.usersStorageService.setUsersList(usersList);
      });
  }

}
