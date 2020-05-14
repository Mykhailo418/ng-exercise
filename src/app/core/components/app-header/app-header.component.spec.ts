import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppHeaderComponent } from './app-header.component';

// models
import { User } from '../../models/user.model';

// services
import { AuthService } from '../../services/auth.service';

const mockUser: User = {
  firstName: 'Ahsan',
  lastName: 'Ayaz'
};

class mockAuthService {
  observeLoggedInState() {
    return of(true);
  }
  login() {
  }
  logout(){
  }
  getUserData(){
    return mockUser;
  }
}

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      providers: [
        {provide: AuthService, useClass: mockAuthService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(AuthService);
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


    it('should login', () => {
      spyOn(service, 'login').and.callThrough();

      component.login();

      expect(service.login).toHaveBeenCalled();
    });

    it('should signup', () => {
      spyOn(service, 'login').and.callThrough();

      component.signup();

      expect(service.login).toHaveBeenCalled();
    });

    it('should logout', () => {
      spyOn(service, 'logout').and.callThrough();

      component.logout();

      expect(service.logout).toHaveBeenCalled();
    });
});
