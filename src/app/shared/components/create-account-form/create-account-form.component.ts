import {CommonModule} from '@angular/common';
import {Component, inject, NgModule} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ValidationCallbackData} from 'devextreme/ui/validation_rules';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService} from '../../services';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  displayName: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  readonly isRequiredMsg = 'Is required';
  readonly maxLength15CharMsg = 'Max 15 characters';

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  // vars
  loading = false;
  formData: FormData = {
    email: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
    phoneNumber: ''
  };


  async onSubmit(e: Event) {
    e.preventDefault();

    // pwd check
    if (this.formData.password !== this.formData.passwordConfirm) {
      notify('Passwords do not match', 'error', 2000);
      return;
    }

    this.loading = true;

    // read data
    const {email, password, displayName, phoneNumber} = this.formData;

    const result = await this.authService.createAccount(email, password, displayName, phoneNumber);

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

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [CreateAccountFormComponent],
  exports: [CreateAccountFormComponent]
})
export class CreateAccountFormModule {
}
