import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isEqual } from 'lodash-es';
//
import { ENDPOINTS } from '@app/shared/utilities';
import { AuthService } from './../../services/auth.service';
import { RegisterAccountModel } from '../../models/auth.model';
import { NotifyService } from '@app/shared/services/notify.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpFormControl = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required])
  };
  signUp: RegisterAccountModel = new RegisterAccountModel();
  errorMessage: string;
  constructor(
    private router: Router,
    private notifyService: NotifyService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  getErrorMessage(type) {
    if (type === 'email') {
      if (this.signUpFormControl.email.hasError('required')) {
        return 'Hãy nhập email của bạn!';
      }
      return this.signUpFormControl.email.hasError('email')
        ? 'Sai định dạng email'
        : '';
    }

    if (type === 'password') {
      if (this.signUpFormControl.password.hasError('required')) {
        return 'Hãy nhập mật khẩu!';
      }
      return this.signUpFormControl.password.hasError('minLength')
        ? 'Mật khẩu phải dài hơn 6 kí tự!'
        : '';
    }

    if (type === 'confirmPassword') {
      if (this.signUpFormControl.confirmPassword.hasError('required')) {
        return 'Hãy xác nhận mật khẩu!';
      }
    }
    return null;
  }

  onSignUpButtonClicked() {
    if (
      !isEqual(
        this.signUpFormControl.password.value,
        this.signUpFormControl.confirmPassword.value
      )
    ) {
      this.notifyService.notify('Mật khẩu không khớp!');
      return;
    }

    if (
      this.signUpFormControl.email.invalid ||
      this.signUpFormControl.password.invalid ||
      this.signUpFormControl.confirmPassword.invalid
    ) {
      this.notifyService.notify('Hãy nhập đầy đủ thông tin!');
      return;
    }

    if (
      this.signUpFormControl.email.valid &&
      this.signUpFormControl.password.valid &&
      this.signUpFormControl.confirmPassword.valid
    ) {
      this.signUp = new RegisterAccountModel({
        email: this.signUpFormControl.email.value,
        password: this.signUpFormControl.password.value,
        displayName: this.signUpFormControl.displayName.value,
        address: 'Hà Nội',
        addressWardId: '1',
        identityNumber: Math.floor(Math.random() * 1000000000) + '1',
        phoneNumber: Math.floor(Math.random() * 1000000000) + '1',
        roleId: '1'
      });
      this.authService.register(this.signUp).subscribe(
        res => {
          if (res) {
            this.notifyService.notify(
              'Đăng ký thành công! Hãy kiểm tra email để xác nhận tài khoản trước khi đăng nhập!'
            );
            this.router.navigate([ENDPOINTS.LOGIN]);
          }
        },
        error => {
          this.notifyService.notify('Đăng ký thất bại!');
          this.errorMessage = error;
        }
      );
      // random phone number
    }
  }
}
