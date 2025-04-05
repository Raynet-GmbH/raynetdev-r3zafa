import {NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ValidationCallbackData} from 'devextreme/ui/validation_rules';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService} from '../../services';


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html',
  imports: [
    DxFormModule,
    DxLoadIndicatorModule,
    NgIf
  ],
  standalone: true
})
export class ChangePasswordFormComponent implements OnInit {
  loading = false;
  formData: any = {};
  recoveryCode: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recoveryCode = params.get('recoveryCode') || '';
    });
  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const {password} = this.formData;
    this.loading = true;

    const result = await this.authService.changePassword(password, this.recoveryCode);
    this.loading = false;

    if (result.isOk) {
      await this.router.navigate(['/login-form']);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}
