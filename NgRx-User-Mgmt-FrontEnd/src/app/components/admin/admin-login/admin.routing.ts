import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { adminLoginGuard } from '../../../guards/admin.login.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { adminAuthGuard } from '../../../guards/admin.auth.guard';
import { UsersListComponent } from '../users-list/users-list.component';
import { EditListComponent } from '../edit-list/edit-list.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLoginComponent,
    canActivate: [adminLoginGuard],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'userList',
        component: UsersListComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'editUser/:id',
        component: EditListComponent,
        canActivate: [adminAuthGuard],
      },
      {
        path: 'createUser',
        component: CreateUserComponent,
        canActivate: [adminAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
