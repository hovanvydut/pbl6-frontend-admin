import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';

import { ProfileModule } from '../profile/profile.module';
import { SwiperModule } from 'swiper/angular';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { RoleDetailFormComponent } from './components/role-detail-form/role-detail-form.component';
//

export const routes: Routes = [];

const COMPONENTS = [
];

const MODULES = [
  RouterModule.forChild(routes),
  ProfileModule,
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  LayoutModule,
  SwiperModule
];
@NgModule({
  imports: [...MODULES],
  declarations: [
    ...COMPONENTS,
    RoleTableComponent,
    RoleDetailFormComponent,
  ],
  exports: [
    ...COMPONENTS,
    RoleTableComponent,
    RoleDetailFormComponent,
  ]
})
export class RoleModule {}
