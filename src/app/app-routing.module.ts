import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
//
import { PageNotFoundComponent } from './modules/layout/components/page-not-found/page-not-found.component';
import { ViewIconsComponent } from './shared/components/view-icons/view-icons.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@app/modules/admin/admin.module').then(
        m => m.AdminModule
      ),
    data: { preload: false }
  },
  {
    path: 'styles/icons',
    component: ViewIconsComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'admin',
  //   canActivate: [AuthGuard],
  //   pathMatch: 'full',
  // },
  { path: '**', component: PageNotFoundComponent }
];

const config: ExtraOptions = {
  useHash: false,
  enableTracing: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
