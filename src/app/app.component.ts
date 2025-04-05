import {Component, HostBinding} from '@angular/core';
import {AuthService, ScreenService, AppInfoService} from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) {
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}


/*
* todo
* move routing to components.
* use typescript types and interface definitions instead of returning any
* use BehaviorSubject instead of Using normal variables in services.
* use Reactive State Management for:
* - Handling Asynchronous Operations
* - Optimized User Session Handling (example : BehaviorSubject, ReplaySubject )
* - Managing HTTP Requests
* - Simplified Error Handling
* - Avoiding State Management Boilerplate
* - Clean Subscriptions
* - Handling Multiple Observable Streams
* - refactor styles and move reusable stuff inside a separate folder
* - add JS Documentation to code
* - unit test is missing (define the .spec files for components)
* - use base classes and extends new classes from base if possible
* - move each class to its own file (do not define multiple classes in one file)
* - move app to standalone to reduce the hassles of managing the source
* */
