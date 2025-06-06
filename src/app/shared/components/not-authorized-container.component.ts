import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Router} from '@angular/router';
import {SingleCardComponent} from "../../layouts";

@Component({
  selector: 'app-not-authorized-container',
  template: `
    <app-single-card [title]="title" [description]="description">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `],
  standalone: true,
  imports: [
    RouterOutlet,
    SingleCardComponent
  ]
})
export class NotAuthorizedContainerComponent {

  constructor(private router: Router) {
  }

  get title() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'login-form':
        return 'Sign In';
      case 'reset-password':
        return 'Reset Password';
      case 'create-account':
        return 'Sign Up';
      case 'change-password':
        return 'Change Password';
      default:
        return '';
    }
  }

  get description() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'reset-password':
        return 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
      default:
        return '';
    }
  }

}
