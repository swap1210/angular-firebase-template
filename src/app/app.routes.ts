import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SecureLandingComponent } from './secure-landing/secure-landing.component';
import { UserAndProfileAuthGuard } from './route-guard/UserAndProfileAuthGuard';
import {
  CLIENT_USER_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SECURE_HOME_ROUTE,
  SERVICE_USER_ROUTE,
  SUPPORT_USER_ROUTE,
} from './service/data/all-routes';
import { SupportUserComponent } from './secure-landing/support-user/support-user.component';
import { ServiceUserComponent } from './secure-landing/service-user/service-user.component';
import { ClientUserComponent } from './secure-landing/client-user/client-user.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAuthGuard } from './route-guard/UserAuthGuard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: HOME_ROUTE,
    component: LandingComponent,
  },
  {
    path: REGISTER_ROUTE,
    component: RegisterComponent,
  },
  {
    path: LOGIN_ROUTE,
    component: LoginComponent,
  },
  {
    path: PROFILE_ROUTE,
    component: ProfileComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: SECURE_HOME_ROUTE,
    component: SecureLandingComponent,
    canActivate: [UserAndProfileAuthGuard],
  },
  {
    path: SUPPORT_USER_ROUTE,
    component: SupportUserComponent,
    canActivate: [UserAndProfileAuthGuard],
  },
  {
    path: SERVICE_USER_ROUTE,
    component: ServiceUserComponent,
    canActivate: [UserAndProfileAuthGuard],
  },
  {
    path: CLIENT_USER_ROUTE,
    component: ClientUserComponent,
    canActivate: [UserAndProfileAuthGuard],
  },
];
