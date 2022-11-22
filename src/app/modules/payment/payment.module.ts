import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutModule } from '@app/modules/layout/layout.module';

import {
  PaymentTransactionComponent
} from './components';
//

export const routes: Routes = [
  {
    path: '',
    component: PaymentTransactionComponent,
    canActivate: [AuthGuard],
  }
];

const COMPONENTS = [
  PaymentTransactionComponent,
];

const MODULES = [
  RouterModule.forChild(routes),
  CommonModule,
  SharedModule,
  FormsModule,
  ReactiveFormsModule,
  LayoutModule,
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
export class PaymentModule { }
