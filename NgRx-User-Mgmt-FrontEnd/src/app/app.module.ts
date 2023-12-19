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
import { profileReducer } from './states/user/user.reduce';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userEffects } from './states/user/user.effects';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UserNavComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot({
      userDetails: profileReducer,
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
