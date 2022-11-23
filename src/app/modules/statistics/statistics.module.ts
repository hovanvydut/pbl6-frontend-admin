import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  StatisticDetailComponent,
  StatisticRevenueComponent,
} from './components';

const COMPONENTS = [
  StatisticsComponent,
  StatisticRevenueComponent,
  StatisticDetailComponent
];

export const routes: Routes = [
  {
    path: '',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: StatisticRevenueComponent
      }
    ]
  }
];

const MODULES = [
  RouterModule.forChild(routes),
  SharedModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS]
})
export class StatisticsModule { }
