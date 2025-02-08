import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LOGIN_ROUTE } from '../service/data/all-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  router = inject(Router);
  authService = inject(AuthService);

  canActivate(): boolean {
    console.log(
      'AuthGuard#canActivate called ',
      this.authService.isAuthenticated()
    );
    if (this.authService.isAuthenticated()) {
      return true; // Allow navigation
    } else {
      this.router.navigate([LOGIN_ROUTE]); // Redirect to login page
      return false; // Block navigation
    }
  }
}
