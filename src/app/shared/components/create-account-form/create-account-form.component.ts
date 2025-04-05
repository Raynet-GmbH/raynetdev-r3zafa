import {NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {Router, RouterLinkWithHref} from '@angular/router';
import {ValidationCallbackData} from 'devextreme/ui/validation_rules';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService} from '../../services';
import {RegistrationForm} from "../../../interfaces/registrationForm.interface";
import {DxTabsModule} from "devextreme-angular";


@Component({
  selector: 'app-create-account-form',
  standalone: true,
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
  imports: [
    DxTabsModule,
    DxFormModule,
    RouterLinkWithHref,
    DxLoadIndicatorModule,
    NgIf
  ],
})
export class CreateAccountFormComponent {

  // constants
  readonly isRequiredMsg = 'Is required';
  readonly maxLength15CharMsg = 'Max 15 characters';

  // injects
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  // vars
  loading = false;
  formData: RegistrationForm = {
    email: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
    phoneNumber: ''
  };


  async onSubmit(e: Event) {
    e.preventDefault();

    this.loading = true;

    // read data
    const {email, password, displayName, phoneNumber} = this.formData;

    const result = await this.authService
      .createAccount(email, password, displayName, phoneNumber);

    this.loading = false;

    if (result.isOk) {
      notify('Registration successful', 'success', 2000);
      await this.router.navigate(['/login-form']);
    } else notify(result.message, 'error', 2000);

  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }

  validatePhoneNumber = (e: ValidationCallbackData) => {
    const phoneRegex = /^\+\d{1,3}(?:\s?\d+)*$/;
    return phoneRegex.test(e.value);
  };

  validateDisplayName = (e: ValidationCallbackData) => {
    return e.value && e.value.length <= 15;
  };

}
