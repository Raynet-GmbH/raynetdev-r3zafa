import {enableProdMode} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';

import themes from 'devextreme/ui/themes';
import {environment} from './environments/environment';
import {routes} from "./app/app-routes";
import {AppInfoService, AuthGuardService, AuthService, ScreenService} from "./app/shared/services";

if (environment.production) {
  enableProdMode();
}

themes.initialized(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideAnimations(),
      AuthService,
      ScreenService,
      AppInfoService,
      AuthGuardService
    ]
  }).catch(err => console.error(err));
});
