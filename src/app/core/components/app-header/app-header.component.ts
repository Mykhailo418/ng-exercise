import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// models
import { User } from '../../models/user.model';

// services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ng-e-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  user: User;
  isLoggedIn: boolean;

  private ngUnsubscribe = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.observeLoggedInState()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((isLoggedIn: boolean) => {
        this.user = this.authService.getUserData();
        this.isLoggedIn = isLoggedIn;
      });
  }

  login(): void {
    this.authService.login();
  }

  signup(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
