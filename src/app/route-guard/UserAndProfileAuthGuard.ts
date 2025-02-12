import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../service/data/all-routes';
import { ProfileService } from '../service/profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserAndProfileAuthGuard implements CanActivate {
  router = inject(Router);
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  canActivate(): boolean {
    console.log(
      'UserAndProfileAuthGuard#canActivate called ',
      this.authService.isAuthenticatedSignal()
    );

    if (!this.authService.isAuthenticatedSignal()) {
      this.router.navigate([LOGIN_ROUTE]);
      return false;
    }

    const profile = this.profileService.profileSignal();

    if (!profile) {
      this.router.navigate([PROFILE_ROUTE]);
      return false;
    }

    return true;

    // if (this.authService.isAuthenticatedSignal()) {
    //   return true; // Allow navigation
    // } else {
    //   this.router.navigate([LOGIN_ROUTE]); // Redirect to login page
    //   return false; // Block navigation
    // }
  }
}
