import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
//
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { AuthLayoutComponent } from '../layout/components/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { completeIconSet } from 'src/assets/images/svg-icons.constants';
import { SvgIconsRegistryService } from '@app/shared/services/svg-icon-registry.service';
import { LogoutComponent } from './components/logout/logout.component';

const SVG_ICONS = completeIconSet;

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
  }
];

const PROVIDERS = [];

const COMPONENTS = [
  AuthComponent,
  SignUpComponent,
  LoginComponent,
  ForgotPasswordComponent,
  LogoutComponent
];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [...COMPONENTS ],
  providers: [...PROVIDERS]
})
export class AuthModule {
  constructor(private svgIconRegistry: SvgIconsRegistryService) {
    svgIconRegistry.registerIcons(SVG_ICONS);
  }
}
