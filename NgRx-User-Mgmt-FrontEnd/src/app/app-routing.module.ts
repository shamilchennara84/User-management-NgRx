import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';

import { userLoginGuard } from './guards/user.login.guard';
import {userAuthGuard} from './guards/user.auth.guard'
const routes: Routes = [
      {
        path:'user/login',
        component:UserLoginComponent,
        canActivate:[userLoginGuard]
      },
      {
        path:'user/register',
        component:RegisterComponent,
        canActivate:[userLoginGuard]
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'user/profile',
        component:ProfileComponent,
        canActivate:[userAuthGuard]
      },
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
