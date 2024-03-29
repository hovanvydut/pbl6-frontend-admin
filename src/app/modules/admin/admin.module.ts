import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { SidebarLayoutComponent } from '../layout/components/sidebar-layout/sidebar-layout.component';
import { PostModule } from '../post/post.module';
import { ProfileModule } from '../profile/profile.module';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ManageRevenusComponent } from './components/manage-revenus/manage-revenus.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ManageRoleComponent } from './components/manage-role/manage-role.component';
import { ManagePermissionComponent } from './components/manage-permission/manage-permission.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RoleModule } from '../role/role.module';
import { UserModule } from '../user/user.module';
import { SettingModule } from '../setting/setting.module';
import { PaymentModule } from '../payment/payment.module';

export const routes: Routes = [
  {
    path: '',
    component: SidebarLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'statistics',
        loadChildren: () =>
          import('@app/modules/statistics/statistics.module').then(
            m => m.StatisticsModule
          )
      },
      {
        path: 'manage-user',
        component: ManageUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-role',
        component: ManageRoleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-role/:id/manage-permission',
        component: ManagePermissionComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-revenus',
        loadChildren: () =>
          import('@app/modules/payment/payment.module').then(
            m => m.PaymentModule
          )
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

const COMPONENTS = [
  StatisticsComponent,
  DashboardComponent,
  SettingsComponent,
  ManageRevenusComponent,
  ManageUserComponent,
  ManageRoleComponent,
  ManagePermissionComponent,
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  PostModule,
  RoleModule,
  ProfileModule,
  UserModule,
  SettingModule,
  PaymentModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class AdminModule {
  constructor() {}
}
