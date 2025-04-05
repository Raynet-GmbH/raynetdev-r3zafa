import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {IUser} from 'src/user';


const defaultPath = '/';
const defaultUser: IUser = {
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png',
  email: 'reza@example.com',
  displayName: 'Reza',
  phoneNumber: '+49 151 240 123 87'
};

@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router) {
  }

  async logIn(email: string, password: string) {

    try {
      // Send request
      console.log(email, password);
      this._user = {...defaultUser, email};
      await this.router.navigate([this._lastAuthenticatedPath]);

      return {
        isOk: true,
        data: this._user
      };
    } catch {
      return {
        isOk: false,
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    } catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  async createAccount(email: string, password: string, displayName: string, phoneNumber: string) {

    // Send request
    try {
      console.log(email, password, displayName, phoneNumber);

      this._user = {
        ...this._user,
        email,
        displayName,
        phoneNumber
      };

      await this.router.navigate(['/create-account']);
      return {isOk: true};
    } catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    }

  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    } catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    await this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]).then();
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']).then();
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
