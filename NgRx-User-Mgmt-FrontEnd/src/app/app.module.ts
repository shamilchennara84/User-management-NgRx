import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserNavComponent } from './components/user/user-nav/user-nav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransformUrlInterceptor } from './interceptors/transform-url.interceptor';
import { profileReducer, usersReducer } from './states/user/user.reduce';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userEffects } from './states/user/user.effects';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { EditListComponent } from './components/admin/edit-list/edit-list.component';
import { CreateUserComponent } from './components/admin/create-user/create-user.component';
import { AdminRoutingModule } from './components/admin/admin-login/admin.routing';


@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UserNavComponent,
    AdminLoginComponent,
    AdminNavComponent,
    DashboardComponent,
    UsersListComponent,
    EditListComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      userDetails: profileReducer,
      allUsers: usersReducer,
    }),
    EffectsModule.forRoot([userEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransformUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
