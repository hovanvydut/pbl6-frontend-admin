import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { BaseService } from '@app/core/services/base.service';
import { AuthService } from '../../services/auth.service';
import { LoginModel } from '../../models/auth.model';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormControl = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  };
  errorMessage: string;
  hidePwd: boolean = true;
  returnUrl: string;

  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private authService: AuthService,
    private baseService: BaseService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.returnUrl = params['returnUrl'] || ENDPOINTS.HOME;
    });
  }

  ngOnInit() {}

  getEmailErrorMessage() {
    if (this.loginFormControl.email.hasError('required')) {
      return 'Hãy nhập email của bạn!';
    }
    return this.loginFormControl.email.hasError('email')
      ? 'Sai định dạng email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginFormControl.password.hasError('required')) {
      return 'Hãy nhập mật khẩu!';
    }
    return this.loginFormControl.password.hasError('minLength')
      ? 'Mật khẩu phải dài hơn 6 kí tự!'
      : '';
  }

  onSignInButtonClicked() {
    this.errorMessage = '';
    let data: LoginModel = new LoginModel({
      email: this.loginFormControl.email.value,
      password: this.loginFormControl.password.value
    });
    this.authService.login(data).subscribe(
      res => {
        if (res) {
          this.baseService.storeLoggedUser(res);
          this.baseService.storeToken(res.accessToken);
          this.router.navigateByUrl(this.returnUrl).then();
        }
      },
      err => {
        this.notifyService.notify(err);
        this.errorMessage = err.message;
      }
    );
  }
}
