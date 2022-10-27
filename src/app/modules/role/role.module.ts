import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';

import { ProfileModule } from '../profile/profile.module';
import { SwiperModule } from 'swiper/angular';
import {
  RoleTableComponent,
  RoleDetailFormComponent,
  PermissionTableComponent,
} from './components';
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
    PermissionTableComponent,
  ],
  exports: [
    ...COMPONENTS,
    RoleTableComponent,
    RoleDetailFormComponent,
    PermissionTableComponent,
  ]
})
export class RoleModule { }
