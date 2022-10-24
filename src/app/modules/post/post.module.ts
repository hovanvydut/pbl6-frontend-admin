import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';

import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './post.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { PostDetailFormComponent } from './components/post-detail-form/post-detail-form.component';
import { ProfileModule } from '../profile/profile.module';
import { SwiperModule } from 'swiper/angular';
import { PostSwiperComponent } from './components/post-swiper/post-swiper.component';
//

export const routes: Routes = [];

const COMPONENTS = [
  PostComponent,
  PostListComponent,
  PostTableComponent,
  PostDetailFormComponent,
  PostSwiperComponent
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
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class PostModule {}
