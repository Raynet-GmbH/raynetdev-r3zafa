import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SingleCardModule, SideNavOuterToolbarComponent, SideNavInnerToolbarComponent} from './layouts';
import {
  FooterComponent,
  CreateAccountFormComponent,
  ChangePasswordFormComponent,
  LoginFormComponent, ResetPasswordFormComponent
} from './shared/components';
import {AuthService, ScreenService, AppInfoService} from './shared/services';
import {UnauthenticatedContentModule} from './unauthenticated-content';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SingleCardModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    ChangePasswordFormComponent,
    CreateAccountFormComponent,
    FooterComponent,
    SideNavOuterToolbarComponent,
    SideNavInnerToolbarComponent,
    LoginFormComponent,
    ResetPasswordFormComponent,
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
