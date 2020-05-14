import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { tap, takeUntil, map, switchMap } from 'rxjs/operators';

// services
import { UsersService } from '../../services/users.service';
import { UsersStorageService } from '../../services/users-storage.service';

// models
import { UserExtended } from '../../models/users.model';

@Component({
  selector: 'ng-e-app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId: string;
  usersDetail: UserExtended;
  loading = true;

  private ngUnsubscribe = new Subject();

  constructor(private usersService: UsersService,
              private usersStorageService: UsersStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.userId = params.id;
        this.usersStorageService.getUser(+this.userId)
          .pipe(
            switchMap((detail: UserExtended) => {
              console.log(detail);
              if (!detail) {
                return this.usersService.getUserById(+this.userId)
              }
              return of(detail);
            }),
            takeUntil(this.ngUnsubscribe),
          )
          .subscribe((detail: UserExtended) => {
            this.usersDetail = detail;
            this.loading = false;
          });
      });
  }

  back(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
