import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LOGIN_ROUTE } from '../service/data/all-routes';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  router = inject(Router);
  authService = inject(AuthService);

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticatedSignal();
    console.log('UserAuthGuard#canActivate called ', isAuthenticated);

    if (!isAuthenticated) {
      this.router.navigate([LOGIN_ROUTE]);
      return false;
    }

    return true;
  }
}
