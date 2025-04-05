import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {IUser} from '../../interfaces/user.interface';
import {GetUserResponseInterface} from "../../interfaces/get-user-response.interface";
import {defaultPath, defaultUser} from "../../constants";


@Injectable()
export class AuthService {

  // injects
  private router: Router = inject(Router);

  // vars
  private _user: IUser | null = defaultUser;
  private _lastAuthenticatedPath: string = defaultPath;


  get loggedIn(): boolean {
    return !!this._user;
  }


  async getUser(): Promise<GetUserResponseInterface> {
    try { /* Send request*/
      return {isOk: true, data: this._user};
    } catch {
      return {isOk: false, data: null};
    }
  }

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
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

