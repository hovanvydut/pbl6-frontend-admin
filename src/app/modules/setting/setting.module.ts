import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { PostModule } from '../post/post.module';
import { ProfileModule } from '../profile/profile.module';
import { SettingTableComponent, SettingDetailFormComponent } from './components';

export const routes: Routes = [];

const COMPONENTS = [
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  PostModule,
  ProfileModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    SettingTableComponent,
    SettingDetailFormComponent,
  ],
  imports: [...MODULES],
  exports: [
    ...COMPONENTS,
    SettingTableComponent,
    SettingDetailFormComponent,
  ],
})
export class SettingModule {
  constructor() { }
}