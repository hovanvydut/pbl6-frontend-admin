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
import { SettingsComponent } from './components/settings/settings.component';
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
        component: StatisticsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-user',
        component: ManageUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-revenus',
        component: ManageRevenusComponent,
        canActivate: [AuthGuard]
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
  ManageUserComponent
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  PostModule,
  ProfileModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class AdminModule {
  constructor() {}
}
