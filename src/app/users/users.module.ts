import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// modules
import { UsersRoutingModule } from './users-routing.module';

// services
import { UsersService } from './services/users.service';

// components
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UsersComponent,
    UserDetailComponent
  ],
  providers: [
    UsersService
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule
  ]
})
export class UsersModule { }
