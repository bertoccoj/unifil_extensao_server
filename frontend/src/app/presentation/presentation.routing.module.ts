import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';
// import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { BackofficeGuard } from '../core/guards/backoffice.guard';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { RoleRequestComponent } from './admin/components/role-request/role-request.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: { title: 'Login' },
  },
  {
    path: 'admin',
    data: { title: 'Admin' },
    component: AdminPageComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'role-request',
        component: RoleRequestComponent,
      },
      // {
      //   path: 'users',
      //   component: UserListComponent,
      // },
    ],
  },
  {
    path: 'home',
    data: { title: 'Inicio' },
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard, BackofficeGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard, BackofficeGuard],
})
export class PresentationRoutingModule { }
