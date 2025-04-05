import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {defaultPath} from "../../constants";

@Injectable()
export class AuthGuardService implements CanActivate {

  // injects
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

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

    if (!isLoggedIn && !isAuthForm) this.router.navigate(['/login-form']).then();
    if (isLoggedIn) this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;

    return isLoggedIn || isAuthForm;
  }
}
